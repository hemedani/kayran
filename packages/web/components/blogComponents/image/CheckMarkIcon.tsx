import * as React from "react";

function CheckMarkIcon(props: React.SVGProps<SVGSVGElement>) {
  //TODO Remove this component whenever font icons added
  return (
    <svg width="19.63" height="12.72" viewBox="0 0 19.63 12.72" {...props}>
      <path
        data-name="Layer 18"
        d="M10,18.36a.89.89,0,0,1-.67-.3l-6.89-6.9a.94.94,0,0,1,0-1.31.92.92,0,0,1,1.3,0L10,16.14,20.24,5.91a.92.92,0,1,1,1.3,1.3L10.7,18.05A.9.9,0,0,1,10,18.36Z"
        transform="translate(-2.19 -5.64)"
      />
    </svg>
  );
}

const MemoCheckMarkIcon = React.memo(CheckMarkIcon);
export default MemoCheckMarkIcon;
