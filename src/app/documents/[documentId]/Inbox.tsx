"use client";
import { ClientSideSuspense } from "@liveblocks/react";
import { BellIcon } from "lucide-react";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Inbox = () => {
  return (
    <ClientSideSuspense
      fallback={
        <Button variant="ghost" size="icon" className="relative" disabled>
          <BellIcon className="size-7" />
        </Button>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
};

export default Inbox;

const InboxMenu = () => {
  const { inboxNotifications } = useInboxNotifications();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <BellIcon className="size-7" />
            {inboxNotifications?.length > 0 && (
              <span className="absolute flex items-center justify-center text-xs text-white rounded-full -top-1 -right-1 size-4 bg-sky-500">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((inboxNotification) => {
                return (
                  <InboxNotification
                    key={inboxNotification.id}
                    inboxNotification={inboxNotification}
                  />
                );
              })}
            </InboxNotificationList>
          ) : (
            <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">
              No notifications
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="inline-flex w-px h-10 bg-neutral-300"></div>
    </>
  );
};
