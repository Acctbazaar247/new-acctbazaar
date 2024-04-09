interface TFeatureCard {
    featureCard: {
        title: string;
        details: string;
        imageUrl: string;
        imageClass: string;
        imagePosition: string;
    }
}

export default function FeaturesCard({ featureCard }: TFeatureCard) {
    return (
        <div className='w-full myShadow rounded-sm'>
            <div className='px-4 lg:px-8 pb-9 pt-9'>
                <h3 className="text-2xl font-bold pb-3">{featureCard?.title}</h3>
                <p className="leading-7">{featureCard?.details}</p>
            </div>
            <div className={featureCard?.imagePosition}>
                <img className={featureCard?.imageClass} src={featureCard?.imageUrl} alt={featureCard?.title} />
            </div>
        </div>
    );
};
