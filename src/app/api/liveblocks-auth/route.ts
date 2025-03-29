import {Liveblocks} from '@liveblocks/node'
import {auth , currentUser} from '@clerk/nextjs/server'
import {ConvexHttpClient} from 'convex/browser'
import { api } from '../../../../convex/_generated/api';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
const liveblocks = new Liveblocks({
    secret:process.env.LIVEBLOCKS_SECRET_KEY!
})

export async function POST(req:Request) {
       const {sessionClaims}  = await auth(); 

       if(!sessionClaims){
        return new Response('Unauthorized',{status:401})
       }
       const user = await currentUser();

       if(!user){
        return new Response('Unauthorized',{status:401})
       }
    
        const {room} = await req.json();
        const document = await convex.query(api.documents.getById, {id:room})

        if(!document){
            return new Response('Unauthorized',{status:401})
           }

        const isOwner = document.ownerId === user.id
        const isOrganizationMember = !!(document.organizationId && document.organizationId === sessionClaims.org_id)

        if(!isOwner && !isOrganizationMember){
            return new Response('Unauthorized',{status:401})
        }
        const str = user.fullName ?? "Anonyous"
        const hash = str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

        // Generate RGB values
        const r = (hash * 37) % 256;   // Red (0-255)
        const g = (hash * 59) % 256;   // Green (0-255)
        const b = (hash * 83) % 256;   // Blue (0-255)
    
        const color =  `rgba(${r}, ${g}, ${b}, ${1})`;

        const session = liveblocks.prepareSession(user.id, {
            userInfo:{
                name : user.fullName ?? "Anonyous",
                avatar: user.imageUrl,
                color
            }
        })

        session.allow(room ,session.FULL_ACCESS);
        const {body , status} = await session.authorize()

        return new Response(body , {status})

}