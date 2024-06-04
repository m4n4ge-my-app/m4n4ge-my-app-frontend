import BaseLayer from '../../../components/baseLayer/BaseLayer';
import IManageGrid from '../../../components/grids/IManageGrid';

const CoverLetters = () => {
  return (
    <BaseLayer type="coverLetter">
      <IManageGrid formLabel="Add Cover Letter" listLabel="Cover Letters" />
    </BaseLayer>
  );
};

export default CoverLetters;
