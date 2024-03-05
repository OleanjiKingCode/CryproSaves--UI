import HomePage from '@/components/Home/home';
import Main from '@/components/Main';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <div className="w-full flex flex-col min-h-screen  bg-pink-100">
      {/* <Main /> */}
      <HomePage />
      <Toaster />
    </div>
  );
}
