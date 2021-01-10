import * as React from "react";

function MoreIcon(props: React.SVGProps<SVGSVGElement>) {
  //TODO Remove this component whenever font icons added
  return (
    <svg x="0px" y="0px" viewBox="0 0 426.667 426.667" {...props}>
      <g>
        <g>
          <circle cx="42.667" cy="213.333" r="42.667" />
        </g>
      </g>
      <g>
        <g>
          <circle cx="213.333" cy="213.333" r="42.667" />
        </g>
      </g>
      <g>
        <g>
          <circle cx="384" cy="213.333" r="42.667" />
        </g>
      </g>
    </svg>
  );
}

const MemoMoreIcon = React.memo(MoreIcon);
export default MemoMoreIcon;
