import React from 'react';
import Filter from './controlPanel/filter/Filter';
import { useNavigate } from 'react-router-dom';
import routes from '../constants/routes';

const ControlPanel = () => {
  const navigate = useNavigate();
  return (
    <div className="control_panel_container">
      <Filter />
      <div className="controlpanel_btns_container">
        <button
          className="controlpanel_btn add_listing"
          onClick={() => navigate(routes.addListing)}
        >
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
