import {useEffect, useState} from 'react';
import {ChevronLeft, ChevronRight} from "../Icons";

export type Slide = {
    image: string;
    title: string;
    description: string;
}

interface CarouselProps {
    slides: Slide[];
}

const Carousel = ({slides}: CarouselProps) => {
    const [current, setCurrent] = useState<number>(0);
    const onClickPrevious = () => {
        if (current === 0) {
            setCurrent(slides.length - 1)
        } else {
            setCurrent(current - 1);
        }
    }

    const onClickNext = () => {
        if (current === slides.length - 1) {
            setCurrent(0);
        } else {
            setCurrent(current + 1);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);


    return (
        <div className="overflow-hidden relative pb-20">
            <div className={`flex transition ease-out duration-400`}
                 style={{
                     transform: `translateX(-${current * 100}%)`
                 }}
            >
                {
                    slides.map((slide: Slide, index) => (
                        <div className="w-full flex-shrink-0 flex flex-col justify-center items-center" key={"carousel-" + index}>
                            <img src={slide.image} alt="Carousel" className="w-[380px] object-contain mt-5"/>
                            <div className="text-blue-600 font-semibold mt-5 text-xl">{slide.title}</div>
                            <div className="text-sm font-light">{slide.description}</div>
                        </div>
                    ))
                }
            </div>

            <div className="absolute top-0 h-full w-full flex justify-between items-center px-10">
                <button onClick={onClickPrevious}><ChevronLeft stroke="#045DE0"/></button>
                <button onClick={onClickNext}><ChevronRight stroke="#045DE0"/></button>
            </div>

            <div className="absolute bottom-0 flex justify-center items-center px-4 w-full gap-3">
                {
                    slides.map((_, index: number) => (
                        <div onClick={() => setCurrent(index)}
                             className={`rounded-full w-2 h-2 cursor-pointer ${index === current ? "bg-blue-600" : "bg-gray-500"}`}
                             key={"circle-" + index}></div>
                    ))
                }
            </div>
        </div>
    );
};

export default Carousel;