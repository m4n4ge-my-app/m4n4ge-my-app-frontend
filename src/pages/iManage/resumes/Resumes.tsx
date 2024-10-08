import BaseLayer from '../../../components/baseLayer/BaseLayer';
import IManageGrid from '../../../components/grids/IManageGrid';

const Resumes = () => {
  return (
    <BaseLayer type="resume">
      <IManageGrid formLabel="Resume" listLabel="Resumes" />
    </BaseLayer>
  );
};

export default Resumes;
