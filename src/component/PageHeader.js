import React, { useEffect, useState } from "react";
import { PageHeader } from "antd";
import { useLocation } from "react-router-dom";

function PageHeaderLayout({ menutitle }) {
  const [title, setTitle] = useState("");
  let location = useLocation();

  useEffect(() => {
    menutitle.map((x) => {
      if (x.path === location.pathname) {
        setTitle(x.title);
      }
    });
  }, [location]);

  return (
    <PageHeader
      ghost={false}
      title={title}
    />
  );
}

export default PageHeaderLayout;
