import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from './ui/separator';
import { Card, CardContent } from './ui/card';

const Answers = () => {
  return (
    <Card className='p-none'>
      <CardContent className='p-8'>
        <RadioGroup>
          <div className='flex items-center space-x-2 py-2'>
            <RadioGroupItem value='option-1' id='option-1' />
            <Label
              htmlFor='option-1'
              className='font-normal text-lg md:text-xl'
            >
              Option 1
            </Label>
          </div>
          <Separator />
          <div className='flex items-center space-x-2 py-2'>
            <RadioGroupItem value='option-2' id='option-2' />
            <Label
              htmlFor='option-2'
              className='font-normal text-lg md:text-xl'
            >
              Option 2
            </Label>
          </div>
          <Separator />
          <div className='flex items-center space-x-2 py-2'>
            <RadioGroupItem value='option-3' id='option-3' />
            <Label
              htmlFor='option-3'
              className='font-normal text-lg md:text-xl'
            >
              Option 3
            </Label>
          </div>
          <Separator />
          <div className='flex items-center space-x-2 py-2'>
            <RadioGroupItem value='option-4' id='option-4' />
            <Label
              htmlFor='option-4'
              className='font-normal text-lg md:text-xl'
            >
              Option 4
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default Answers;
