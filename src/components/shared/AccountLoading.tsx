import { Skeleton } from "antd";

const AccountLoading = () => {
  const items = [1, 2, 3, 4, 5, 6];
  return items.map((item) => (
    <div key={item} className="flex justify-between w-full pt-4 ">
      <div className="flex gap-4 items-center w-full md:w-3/5">
        <Skeleton.Image className="rounded-xl" active={true} />
        <div className="flex flex-col space-y-1 w-full">
          <Skeleton.Input block={true} size="default" active={true} />
          <Skeleton.Input block={true} size="small" active={true} />
          <div className="flex items-center gap-1">
            <Skeleton.Avatar size="small" active={true} />
            <Skeleton.Button size="small" active={true} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-2 ">
        <Skeleton.Input size="default" active={true} />
        <div className="flex items-center gap-6">
          <Skeleton.Button size="default" shape="circle" active={true} />
          <Skeleton.Button size="default" shape="circle" active={true} />
        </div>
      </div>
    </div>
  ));
};

export default AccountLoading;
