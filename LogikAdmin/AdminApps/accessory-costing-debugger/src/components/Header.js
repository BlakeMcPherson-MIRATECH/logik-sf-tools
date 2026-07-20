import React from "react";

const Header = () => {
  return (
    <>
      <div className="brand-strip" />
      <div className="brand-bar">
        <div className="brand-mark">
          <span className="brand-logo-dot">M</span>
          <span className="brand-name">Miratech</span>
          <span className="brand-app-title">BOM Adder Debugger</span>
        </div>
        <span className="brand-tag">Logik CPQ Admin Tools</span>
      </div>
      <div className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">BOM Adder Debugger</h1>
          <p className="hero-sub">
            Paste the accessory costing JSON for a quote line, pick the workbook and
            product, and see which BOM adders fired versus which ones were skipped.
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
