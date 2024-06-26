import ApplicationsTable from './listTable/ApplicationsTable';
import {
  groupedApplicationsByDate,
  groupedApplicationsByWeek,
  groupedApplicationsByMonth,
  Application,
} from '../../utils/mockDataGenerator';

interface ListProps {
  viewMode: string;
}

export default function List({ viewMode }: ListProps) {
  let applicationsGroup: Record<string, Application[]>[] = [];
  switch (viewMode) {
    case 'days':
      applicationsGroup = groupedApplicationsByDate;
      break;
    case 'weeks':
      applicationsGroup = groupedApplicationsByWeek;
      break;
    case 'months':
      applicationsGroup = groupedApplicationsByMonth;
      break;
    default:
      applicationsGroup = [];
  }

  return (
    <div>
      {applicationsGroup.map((appGroup, index) => {
        const groupTitle = Object.keys(appGroup)[0];
        const applications = appGroup[groupTitle];

        return (
          <ApplicationsTable
            key={index}
            viewMode={viewMode}
            applicationDate={groupTitle}
            applications={applications}
          />
        );
      })}
    </div>
  );
}
