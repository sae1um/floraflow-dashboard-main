import React from 'react'
import "../../styles/carousel.css"
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import { InfoCard, ControlStatusCard } from '../dashboard/Gauge'
import { RoomView } from '../TabViews'

export function EmblaGaugesCarousel() {
    const slides = [
        <InfoCard title="TEMPERATURE" value={"21"} colour={"#ed1515"} />,
        <InfoCard title="HUMIDITY" value={"21"} colour={"#f97316"} />,
        <InfoCard title="SOIL MOISTURE" value={"21"} colour={"#10b981"} />,
        <ControlStatusCard lightStatus={true} ventStatus={false} />
    ]

    const [emblaRef, emblaApi] = useEmblaCarousel({ containScroll: true });
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides}
                </div>
            </div>
            <div className="embla__controls">
                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export function EmblaRoomsCarousel(){
    const [emblaRef, emblaApi] = useEmblaCarousel({ containScroll: true });
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    <RoomView />
                </div>
            </div>
            <div className="embla__controls">
                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}