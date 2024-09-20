import React from 'react';
import ControlPanel from '../components/controlPanel/ControlPanel';
import Homepage from '../components/home/Homepage';
import Modal from '../components/Modal/Modal';
import { useModal } from '../contexts/ModalContext';
import AddAgentModal from '../components/Modal/AddAgentModal';

const Home = () => {
  const { isModalOpen } = useModal();
  console.log(isModalOpen);
  return (
    <div>
      <ControlPanel />
      <Homepage />
      {isModalOpen && (
        <Modal>
          <AddAgentModal />
        </Modal>
      )}
    </div>
  );
};

export default Home;
