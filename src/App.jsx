import {useEffect, useState} from "react";
import image1Url from "@/assets/image-1.png";
import image2Url from "@/assets/image-2.png";
import image3Url from "@/assets/image-3.png";
import image4Url from "@/assets/image-4.png";
import image5Url from "@/assets/image-5.png";
import image6Url from "@/assets/image-6.png";
import image7Url from "@/assets/image-7.png";
import image8Url from "@/assets/image-8.png";
import Swal from "sweetalert2";
import "./App.css";
import Item from "./components/Item";
import {FaMoon, FaRegSun} from "react-icons/fa";
import useDarkMode from "@/components/useDarkMode.jsx";

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

function App() {
    const [selectedItemIds, setSelectedItemIds] = useState([]);
    const [numberClick, setNumberClick] = useState(0);
    const [numberClick2, setNumberClick2] = useState(40);
    const [time, setTime] = useState(120)
    const [isRunning, setIsRunning] = useState(false)
    const [theme, toggleTheme] = useDarkMode();
    const [isSun, setIsSun] = useState(true);
    const [isMoon, setIsMoon] = useState(false);



    const toggleIcons = () => {
        setIsSun(!isSun);
        setIsMoon(!isMoon);
    };

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

    useEffect(() => {
        if (time <= 0 || numberClick2 <= 0) {
            loseGame();
        }
    }, [time, numberClick2]);

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
            if (!selectedItemIds.includes(item.id)) {
                setNumberClick2(numberClick2 - 1);
                setSelectedItemIds([...selectedItemIds, item.id]);
            }
            setNumberClick(numberClick + 1);

            if (selectedItemIds.length % 2 !== 0) {
                const lastItemId = selectedItemIds[selectedItemIds.length - 1];
                const lastItem = items.find((item) => item.id === lastItemId);

                if (item.identifier !== lastItem.identifier) {
                    setTimeout(() => {
                        setSelectedItemIds(selectedItemIds.filter((i) => i != lastItemId));
                        setNumberClick(0);
                    }, 1000);
                } else {
                    setNumberClick(0);
                }
            }

        }
        console.log(selectedItemIds);
        if (selectedItemIds.length >= 15) {
            console.log("win");
            showWinAlert();
        }
    }


    function showLoseAlert() {
        Swal.fire({
            title: "باختی",
            text: "مهم نیست! دوباره امتحان کن",
            icon: "error",
            confirmButtonText: "حله",
        });
    }

    function showWinAlert() {
        Swal.fire({
            title: "!!بردی",
            text: "دوباره خودتو به چالش بکش",
            icon: "success",
            confirmButtonText: "حله",
        });
    }
    const loseGame = () => {
        showLoseAlert()
        setIsRunning(false)
        setNumberClick2(0)
    }

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
        <div
            id="root"
            style={{
                background: theme === "dark" ? "#1d3557" : "#e9e9e9",
                transition: ".2s all",
            }}
        >
            <div className="swichTheme" onClick={toggleIcons}>
                {isSun && (
                    <FaRegSun onClick={toggleTheme} className="icon_light_mode"/>
                )}
                {isMoon && <FaMoon onClick={toggleTheme} className="icon_dark_mode"/>}
            </div>
            <div
                className="game-box"
                style={{
                    background: theme === "dark" ? "#0d1321" : "#ffffff",
                    transition: ".2s all",
                }}
            >
                <div className="time-move">
                    <div
                        style={{
                            color: theme === "dark" ? "#ffff" : "#0d1321",
                            transition: ".2s all",
                        }}
                    >
                        زمان : {time > 0 ? formatTime() : "0:00"}
                    </div>
                    <div
                        style={{
                            color: theme === "dark" ? "#ffff" : "#0d1321",
                            transition: ".2s all",
                        }}
                    >
                        تعداد حرکت : {numberClick2}
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
        </div>
    );
}

export default App;
