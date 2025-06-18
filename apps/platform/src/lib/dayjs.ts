import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';
import RelativeTime from 'dayjs/plugin/relativeTime';
import Timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(Duration);
dayjs.extend(RelativeTime);
dayjs.extend(Timezone);
dayjs.extend(utc);

export { default as dayjs } from 'dayjs';
