import React from 'react';
import Filter from './controlPanel/filter/Filter';

const ControlPanel = () => {
  return (
    <div className="control_panel_container">
      <Filter />
      <div className="controlpanel_btns_container">
        <button className="controlpanel_btn add_listing">
          + ლისტინგის დამატება
        </button>
        <button className="controlpanel_btn add_agent">
          + აგენტის დამატება
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
