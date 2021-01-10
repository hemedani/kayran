import * as React from "react";

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  //TODO Remove this component whenever font icons added
  return (
    <svg width="1em" height="1em" viewBox="0 0 19.82 16.54" {...props}>
      <path
        d="M18.3 1.27a4.44 4.44 0 00-3.2-1.29 6.05 6.05 0 00-4.19 1.81l-1 1-1-1A6.05 6.05 0 004.72 0a4.44 4.44 0 00-3.2 1.27 5.23 5.23 0 000 7.37l1 1 6.5 6.5a1.21 1.21 0 001.72 0l6.5-6.5 1-1a5.23 5.23 0 000-7.37zm-.71 6.66l-1 1-6.5 6.5a.22.22 0 01-.32 0l-6.5-6.5-1-1a4.21 4.21 0 010-5.95 3.45 3.45 0 012.49-1 5 5 0 013.46 1.5l1 1a1 1 0 001.4 0l1-1a5 5 0 013.46-1.5 3.45 3.45 0 012.49 1 4.21 4.21 0 010 5.95z"
        data-name="outline heart"
      />
    </svg>
  );
}

const MemoHeartIcon = React.memo(HeartIcon);
export default MemoHeartIcon;
