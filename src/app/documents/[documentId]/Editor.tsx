'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import { useEditorStore } from '@/store/use-editor-store'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import {Color }from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import FontSize from 'tiptap-extension-font-size'
import {LineHeight} from '@/components/extensions/lineHeight'
import { useLiveblocksExtension, FloatingToolbar } from "@liveblocks/react-tiptap";
import { Threads } from '@/components/ui/editor/Threads'


interface EditorProps {
  initialContent?: string | undefined 
}

const Editor = ({initialContent}:EditorProps) => {
    const {setEditor} = useEditorStore()
    const liveblocks = useLiveblocksExtension({
      initialContent,
      offlineSupport_experimental:true
    });
    const editor = useEditor({
        immediatelyRender:false, 
        onCreate({editor}) {
            setEditor(editor);
        },onBlur({editor}) {
            setEditor(editor);
        },onDestroy() {
            setEditor(null);
        },onSelectionUpdate({editor}) {
            setEditor(editor);
        },onUpdate({editor}) {
            setEditor(editor);
        },onTransaction({editor}) {
            setEditor(editor);
        },onFocus({editor}) {
            setEditor(editor);
        },onContentError({editor}) {
            setEditor(editor);
        },
        editorProps:{
            attributes:{
                class:'focus:outline-none  print:border-0 border bg-white border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 cursor-text',
                style:'padding-left: 56px; padding-right:56px '
            }
        },
        extensions: [
          StarterKit.configure({
            history: false,
          }),
            TaskItem.configure(
                {
                    nested:true
                }
            ),
            TaskList,
            Table.configure({
                resizable: true,
              }),
              TableRow,
              TableHeader,
              TableCell,
              // Image,
              ImageResize,
              Underline,
              FontFamily.configure({
                types: ['textStyle'], // Apply font family to textStyle extension
              }),
              // Text,
              TextStyle,
              Highlight.configure({ multicolor: true }),
              Color,
              Link.configure({
                openOnClick:false,
                autolink:true,
                defaultProtocol:'https',
              }),
              TextAlign.configure({
                types: ['heading', 'paragraph'],
              }),
              FontSize,
              LineHeight.configure({
                types:['heading','paragraph'],
                defaultHeight:'100%'
              }),
              liveblocks,
        ],
        content: ``,
      })
  return (
    <div className='size-full overflow-x-auto px-4 bg-[#F9FBFD] print:p-0 print:bg-white print:overflow-visible'>  
    {/* <Ruler /> */}
    <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
      <EditorContent editor={editor} />
      <Threads editor={editor} />
        </div> 
    </div >
  )
}

export default Editor
