import BaseLayer from '../../../components/baseLayer/BaseLayer';
import GenericGrid from '../../../components/grids/GenericGrid';

const AddApp = () => {
  return (
    <BaseLayer type="add">
      <GenericGrid formLabel="Add Application Record" type="add" />
    </BaseLayer>
  );
};

export default AddApp;
