import {useEffect, useState} from "react";
import image1Url from "@/assets/image-1.png";
import image2Url from "@/assets/image-2.png";
import image3Url from "@/assets/image-3.png";
import image4Url from "@/assets/image-4.png";
import image5Url from "@/assets/image-5.png";
import image6Url from "@/assets/image-6.png";
import image7Url from "@/assets/image-7.png";
import image8Url from "@/assets/image-8.png";

const images = [
    image1Url,
    image2Url,
    image3Url,
    image4Url,
    image5Url,
    image6Url,
    image7Url,
    image8Url,
];

import "./App.css";
import Item from "./components/Item";

function App() {
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [numberClick, setNumberClick] = useState(0);
    const [numberClick2, setNumberClick2] = useState(40);
    const [time, setTime] = useState(120)
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let timer = null;

        if (isRunning) {
            timer = setInterval(() => {
                setTime(prevSeconds => prevSeconds - 1);
            }, 1000);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isRunning])
    const formatTime = () => {
        if (time > 0) {
            const minutes = Math.floor(time / 60);
            const remainingSeconds = time % 60;
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }
    }
    const generateRandom = () =>
        Array.from({length: 16}).map((_, i) => {
            return {
                id: i + 1,
                identifier: Math.floor(i / 2),
                image: images[Math.floor(i / 2)],
            };
        })
            .sort(() => Math.random() - 0.5)
    const [items, setItems] = useState(generateRandom);

    const handleClick = (item) => {
        if (numberClick < 2 && numberClick2 > 0 && time > 0) {
            setNumberClick2(numberClick2 - 1);
            setNumberClick(numberClick + 1);
            setSelectedItemIds([...selectedItemIds, item.id]);
            if (selectedItemIds.length % 2 !== 0) {
                const lastItemId = selectedItemIds[selectedItemIds.length - 1];
                const lastItem = items.find((item) => item.id === lastItemId);

                if (item.identifier !== lastItem.identifier) {
                    setTimeout(() => {
                        setSelectedItemIds(selectedItemIds.filter((i) => i != lastItemId));
                        setNumberClick(0);
                    }, 1000);

                    console.log(numberClick);
                } else {
                    setNumberClick(0);
                }
            }
        } else {
                alert('sorry u lose :(')
                setIsRunning(false)
                setNumberClick2(0)
            }
    };

    const resetGame = () => {
        setIsRunning(true)
        setTime(120)
        setNumberClick2(40)
        const newItems = generateRandom()
        setSelectedItemIds(newItems.map((i) => i.id));
        setItems(newItems)
        setTimeout(() => {
            setSelectedItemIds([])
        }, 1000);
    }


    return (
        <div className='game-box'>
            <div className='time-move'>
                <div>
                    time:{time > 0 ? formatTime() : '0:00'}
                </div>
                <div>
                    move:{numberClick2}
                </div>
            </div>
            <div className="memory-game">
                {items.map((item, i) => (
                    <Item
                        key={item.id}
                        index={i + 1}
                        image={item.image}
                        onClick={() => handleClick(item)}
                        isShow={selectedItemIds.includes(item.id)}
                    />
                ))}
            </div>
            <button className="btn-reset" onClick={resetGame}>
                شروع دوباره
            </button>
        </div>
    );
}

export default App;
