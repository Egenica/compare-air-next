type CloseSearchProps = {
  setSearchTerm: (term: string) => void;
  setHideShowDropdown: (hide: boolean) => void;
};

export const CloseSearch = ({
  setSearchTerm,
  setHideShowDropdown,
}: CloseSearchProps) => {
  return (
    <div
      className="w-9 h-9 absolute rounded-full justify-center items-center hover:border-slate-500 flex bg-slate-200 hover:bg-slate-300 z-[999] top-[calc(50%-18px)] right-2 md:right-3"
      onClick={() => {
        setSearchTerm('');
        setHideShowDropdown(false);
      }}
      data-testid="clear-search"
    >
      <svg
        style={{ width: '12px' }}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 1000 1000"
        enableBackground="new 0 0 1000 1000"
        xmlSpace="preserve"
      >
        <g>
          <path d="M500,623.8L159.9,963.9c-34.6,34.6-90.1,34.7-124.3,0.5c-34.4-34.4-34-89.8,0.5-124.3L376.2,500L36.1,159.9C1.5,125.3,1.4,69.8,35.6,35.6c34.4-34.4,89.8-34,124.3,0.5L500,376.2L840.1,36.1c34.6-34.6,90.1-34.7,124.3-0.5c34.4,34.4,34,89.8-0.5,124.3L623.8,500l340.1,340.1c34.6,34.6,34.7,90.1,0.5,124.3c-34.4,34.4-89.8,34-124.3-0.5L500,623.8z" />
        </g>
      </svg>
    </div>
  );
};
