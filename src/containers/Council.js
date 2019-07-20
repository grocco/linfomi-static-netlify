import React from "react";
import { withRouteData } from "react-static";
//

export default withRouteData(({ members }) => (
  <div>
    <div>The council.</div>
    <br />
    All Members:
    <ul>
      {members.map(member => (
        <li key={member.data.slug}>
          <div>{member.data.title}</div>
          <div>{member.data.bio}</div>
          <img
            className="image"
            src={
              member.data.picture
                ? `${member.data.picture}` // `${member.data.picture}/-/scale_crop/220x220/`
                : "/assets/member-placeholder.jpg"
            }
            alt=""
          />
        </li>
      ))}
    </ul>
  </div>
));
