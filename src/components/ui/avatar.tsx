import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import clsx from "clsx";

interface AvatarProps {
  placeholder?: boolean;
  size?: number;
  src?: string;
  className?: string;
}

export const Avatar = ({ placeholder = false, size = 24, src, className }: AvatarProps) => {
  if (placeholder) {
    return (
      <Skeleton
        className={clsx("rounded-full", className)}
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-full bg-[var(--ds-gray-alpha-400)]",
        className
      )}
      style={{ width: size, height: size }}
    >
      {src && (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
};

interface GitAvatarProps {
  username?: string;
  size?: number;
  src?: string;
}

const GitHubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const GitLabIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M15.97 9.058l-.895-2.756L13.3.842a.477.477 0 00-.907 0L10.618 6.3H5.382L3.607.842a.477.477 0 00-.907 0L.925 6.302.03 9.058a.665.665 0 00.24.744L8 15.122l7.73-5.32a.665.665 0 00.24-.744" />
  </svg>
);

const BitbucketIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
    <path d="M.778 1.211a.768.768 0 00-.768.892l2.17 13.177a1.043 1.043 0 001.032.878h9.826a.768.768 0 00.768-.646l2.17-13.41a.768.768 0 00-.768-.891H.778zm9.31 9.57H5.902L4.978 5.219h6.063l-.953 5.562z" />
  </svg>
);

const GitProviderAvatar = ({
  username,
  size = 24,
  src,
  icon,
}: GitAvatarProps & { icon: React.ReactNode }) => {
  return (
    <div className="relative inline-flex" style={{ width: size, height: size }}>
      <div
        className="relative h-full w-full overflow-hidden rounded-full bg-[var(--ds-gray-alpha-400)]"
      >
        {src && (
          <img
            src={src}
            alt={username || ""}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full bg-background p-0.5">
        {icon}
      </div>
    </div>
  );
};

export const GitHubAvatar = (props: GitAvatarProps) => (
  <GitProviderAvatar {...props} icon={<GitHubIcon />} />
);

export const GitLabAvatar = (props: GitAvatarProps) => (
  <GitProviderAvatar {...props} icon={<GitLabIcon />} />
);

export const BitbucketAvatar = (props: GitAvatarProps) => (
  <GitProviderAvatar {...props} icon={<BitbucketIcon />} />
);

interface AvatarGroupProps {
  members: {
    username?: string;
    src?: string;
  }[];
  size?: number;
  limit?: number;
}

export const AvatarGroup = ({ members, size = 24, limit = 3 }: AvatarGroupProps) => {
  const visibleMembers = members.length >= limit ? members.slice(0, limit - 1) : members;
  const remaining = members.length - limit + 1;

  return (
    <div className="flex items-center -space-x-2">
      {visibleMembers.map((member, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-full border-2 border-background bg-[var(--ds-gray-alpha-400)]"
          style={{ width: size, height: size }}
        >
          {member.src && (
            <img
              src={member.src}
              alt={member.username || ""}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      ))}
      {members.length === limit && (
        <div
          className="relative overflow-hidden rounded-full border-2 border-background"
          style={{ width: size, height: size }}
        >
          <Avatar src={members[members.length - 1].src} size={size} />
        </div>
      )}
      {members.length > limit && (
        <div
          className="flex items-center justify-center rounded-full border-2 border-background bg-[var(--ds-gray-alpha-400)] text-xs text-foreground"
          style={{ width: size, height: size }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
