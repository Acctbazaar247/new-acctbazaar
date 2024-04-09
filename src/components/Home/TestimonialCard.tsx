interface TTestimonial {
    testimonial: {
        imageUrl: string;
        text: string;
        name: string;
        designation: string;
    }
}

export default function TestimonialCard({ testimonial }: TTestimonial) {
    return (
        <div className='flex flex-col-reverse lg:flex-row gap-16'>
            <img className="w-[316px] h-[336px] mx-auto border-2 border-black rounded-3xl object-cover" src={testimonial?.imageUrl} alt={testimonial?.name} />
            <div className='max-w-3xl flex flex-col justify-between'>
                <h2 className="text-base lg:text-lg 2xl:text-xl font-medium leading-10">{testimonial?.text}</h2>
                <div className='mt-6 lg:mt-auto'>
                    <h2 className="font-bold">{testimonial?.name}</h2>
                    <p className="text-textGrey">{testimonial?.designation}</p>
                </div>
            </div>
        </div>
    );
};
