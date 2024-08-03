import { ChatComponent } from "../Components/Chats/ChatComponent";
import { PrivateLayout } from "../Layouts/PrivateLayout";
import { useUserStore } from "../Stores/User.store";

export const Home = () => {
  const username = useUserStore((state) => state.user);

  return (
    <PrivateLayout>
      <div className="w-full flex flex-col my-8">
        <div className="m-auto flex flex-col text-center gap-4 bg-gray-800 p-4 rounded-lg w-11/12 h-auto  md:w-1/2 md:h-3/4 ">
          <p className="text-gray-50 text-2xl">Welcome {username}</p>
          <ChatComponent />
        </div>
      </div>
    </PrivateLayout>
  );
};
