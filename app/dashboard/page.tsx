// app/dashboard/page.tsx

"use client";

import React from "react";
import DashboardClient from "./DashboardClient";
import DashboardServer from "./DashboardServer";

const DashboardPage = () => {
  if (typeof window !== "undefined") {
    return <DashboardClient />;
  } else {
    return <DashboardServer />;
  }
};

export default DashboardPage;
