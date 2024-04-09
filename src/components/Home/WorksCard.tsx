interface TWorksCard {
    worksCard: {
        number: string;
        title: string;
        details: string;
    }
}

export default function WorksCard({ worksCard }: TWorksCard) {
    return (
        <div className='flex gap-4 lg:gap-6 text-white'>
            <div className='font-medium lg:font-bold text-2xl lg:text-4xl'>
                {worksCard?.number}
            </div>
            <div className='space-y-2'>
                <h2 className="text-lg lg:text-2xl font-medium lg:font-bold">{worksCard?.title}</h2>
                <p className="leading-7 font-light lg:font-normal">{worksCard?.details}</p>
            </div>
        </div>
    );
};
