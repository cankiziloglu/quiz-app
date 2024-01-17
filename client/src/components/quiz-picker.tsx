import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const QuizPicker = () => {
  return (
    <Card className='w-full md:w-1/2 mx-auto h-max'>
      <CardHeader>
        <CardTitle className='text-2xl'>Pick Your Challenge</CardTitle>
        <CardDescription className='text-xl'>
          Select a Quiz now to show what you know!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select>
          <SelectTrigger id='quiz'>
            <SelectValue placeholder='Select a Quiz' />
          </SelectTrigger>
          <SelectContent position='popper'>
            {/* TODO: Iterate over quizzes and display here */}
            <SelectItem value='next'>Next.js</SelectItem>
            <SelectItem value='sveltekit'>SvelteKit</SelectItem>
            <SelectItem value='astro'>Astro</SelectItem>
            <SelectItem value='nuxt'>Nuxt.js</SelectItem>
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button size='lg' className='mx-auto text-lg'>
          Start
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuizPicker;
