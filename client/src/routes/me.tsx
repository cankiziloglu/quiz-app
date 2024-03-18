import AccountDetails from '@/components/account-details';
import { Button } from '@/components/ui/button';
import UserStatistics from '@/components/user-statistics';
import { useState } from 'react';

type AccountTabType = 'account-details' | 'statistics';

const Me = () => {
  const [activeTab, setActiveTab] = useState<AccountTabType>('account-details');

  return (
    <div className='flex flex-col md:flex-row gap-8 w-full h-full'>
      <aside className='flex md:flex-col gap-2 w-full md:w-1/5 md:h-full justify-center md:justify-start'>
        <Button
          variant={activeTab === 'account-details' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('account-details')}
        >
          Account Details
        </Button>
        <Button
          variant={activeTab === 'statistics' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </Button>
      </aside>

      {activeTab === 'account-details' && (
        <section className='w-full md:h-full md:w-4/5 flex-grow space-y-6'>
          <AccountDetails />
        </section>
      )}
      {activeTab === 'statistics' && (
        <section className='w-full md:h-full flex-grow'>
          <UserStatistics />
        </section>
      )}
    </div>
  );
};

export default Me;
