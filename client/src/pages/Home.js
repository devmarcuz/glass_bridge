import React, { useState, useEffect } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { saveRequest, updateUser, getLocalStorage, setLocalStorage, getUsers } from "../requestMethods";
import { start, success, failure, images_start, images_controls, images_failure, won, images_success } from "../data";

const Home = () => {
  const [twitterBool, setTwitterBool] = useState(false);
  const [username, setUsername] = useState("@");
  const [guestName, setGuestName] = useState("");
  const [startBool, setStartBool] = useState(true);
  const [startText, setStartText] = useState(start[Math.floor(Math.random() * start.length)]);
  const [setImage, setSetImage] = useState(images_start[Math.floor(Math.random() * images_start.length)]);
  const [bool, setBool] = useState(false);
  const [controlBool, setControlBool] = useState(true);
  const [count, setCount] = useState(0);
  const [restartBool, setRestartBool] = useState(false);
  const [userDetails, setUserDetails] = useState(getLocalStorage("glass_bridge"));
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((res) => setUsers(res.data.users));
  }, []);

  useEffect(() => {
    userDetails && setGuestName(userDetails.username);
  }, [userDetails]);

  useEffect(() => {
    if (bool) {
      setTimeout(() => {
        setBool(false);
        setControlBool(true);
      }, 200);
    }
  }, [bool]);

  useEffect(() => {
    if (restartBool) {
      count < 18
        ? setSetImage(images_failure[Math.floor(Math.random() * images_failure.length)])
        : setSetImage(images_success[Math.floor(Math.random() * images_success.length)]);
    }
  }, [restartBool, count]);

  useEffect(() => {
    if (count === 18) {
      const audio = document.querySelector(".successaud");
      audio.currentTime = 0;
      setTimeout(() => {
        audio.play();
      }, 500);
      setRestartBool(true);
      setStartBool(false);
      setStartText(won[Math.floor(Math.random() * won.length)]);
    }
  }, [count]);

  const handleSaveName = () => {
    setTwitterBool(false);
    setUsername(String(username));
    if (username !== "@" || username.length > 1) {
      if (!/\s/.test(username)) {
        username &&
          guestName &&
          saveRequest(username)
            .then((res) => {
              setLocalStorage("glass_bridge", res.data.user);
              setUserDetails(getLocalStorage("glass_bridge"));
              setStartBool(true);
              setRestartBool(false);
              setCount(0);
              setUsername("@");
            })
            .catch((err) => {
              setGuestName("@Guest");
              if (err.response)
                if (err.response.data.error === "User already exists") {
                  alert("Username already exists, choose another");
                }
            });
      } else {
        setGuestName("@Guest");
        setUsername("@");
      }
    } else {
      setUsername("@");
    }
  };

  const startGame = (e) => {
    const audio = document.querySelector(".startaud");
    audio.currentTime = 0;
    audio.play();
    if (e.target.classList.contains("start")) {
      e.target.classList.add("fade");
    }
    setTimeout(() => {
      setStartBool(false);
      setStartText(start[Math.floor(Math.random() * start.length)]);
      setBool(!bool);
    }, 200);
  };

  const restartGame = (e) => {
    const audio = document.querySelector(".startaud");
    audio.currentTime = 0;
    audio.play();
    if (e.target.classList.contains("restart")) {
      e.target.classList.add("fade");
    }
    setCount(0);
    getUsers().then((res) => setUsers(res.data.users));
    setTimeout(() => {
      setRestartBool(false);
      setStartText(start[Math.floor(Math.random() * start.length)]);
      setSetImage(images_controls[Math.floor(Math.random() * images_controls.length)]);
      setBool(!bool);
    }, 200);
  };

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const handleLeft = (e) => {
    const audio = document.querySelector(".left-ad");
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();

    if (random(1, 18) % 2 !== 0) {
      setTimeout(() => {
        setStartBool(false);
        setControlBool(false);
        setStartText(success[Math.floor(Math.random() * success.length)]);
        setSetImage(images_controls[Math.floor(Math.random() * images_controls.length)]);
        setBool(!bool);
        setCount(count + 1);
      }, 100);
    } else {
      const audio = document.querySelector(".break");
      audio.currentTime = 0;
      setTimeout(() => {
        audio.play();
      }, 600);
      setRestartBool(true);
      setStartText(failure[Math.floor(Math.random() * failure.length)]);
      setBool(!bool);
      guestName && updateUser(count, userDetails && userDetails._id);
    }
  };

  const handleRight = () => {
    const audio = document.querySelector(".left-ad");
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();

    if (random(1, 18) % 2 === 0) {
      setTimeout(() => {
        setStartBool(false);
        setControlBool(false);
        setStartText(success[Math.floor(Math.random() * success.length)]);
        setSetImage(images_controls[Math.floor(Math.random() * images_controls.length)]);
        setBool(!bool);
        setCount(count + 1);
      }, 100);
    } else {
      const audio = document.querySelector(".break");
      audio.currentTime = 0;
      setTimeout(() => {
        audio.play();
      }, 600);
      setRestartBool(true);
      setStartText(failure[Math.floor(Math.random() * failure.length)]);
      setBool(!bool);
      guestName && updateUser(count, userDetails && userDetails._id);
    }
  };

  return (
    <div className="home">
      <main>
        <div className="play-container">
          <header>
            <h1>Squid Game - Glass Bridge</h1>
          </header>
          {!twitterBool ? (
            <div className="guest">
              <p>Playing as {!guestName ? "Guest" : guestName.slice(1)}</p>
              <span onClick={() => setTwitterBool(true)}>change</span>
            </div>
          ) : (
            <div className="form">
              <label htmlFor="username">Twitter username:</label>
              <div className="input">
                <input
                  type="text"
                  placeholder="Twitter handle"
                  value={username}
                  onChange={(e) => {
                    if (e.target.value || e.target.value !== "@") {
                      setUsername(e.target.value);
                      e.target.value && setGuestName(e.target.value);
                    }
                  }}
                />
                <button onClick={handleSaveName}>Save</button>
              </div>
            </div>
          )}
          <div className={`question-container ${bool && "all"}`}>
            <img src={setImage} className="img" alt="" />
            <div className="gradient" />

            <div className="main">
              <div className="no-header">
                <div className="no">
                  <span className="remaining">{count}</span> / <div className="span total">18</div>
                </div>
              </div>

              <p>{startText && startText}</p>
            </div>
          </div>
        </div>
        {startBool && (
          <div className="controls">
            <button onClick={startGame} className="start">
              START GAME
            </button>
          </div>
        )}
        {(!startBool || restartBool) && (
          <div className={`controls function ${controlBool && "fade-in"} ${restartBool && "fade-out"} `}>
            <button className="ftn left-audio" onClick={handleLeft}>
              <FaLongArrowAltLeft style={{ fontSize: "9px", marginRight: "5px" }} />
              JUMP LEFT
            </button>
            <button className="ftn right-audio" onClick={handleRight}>
              JUMP RIGHT
              <FaLongArrowAltRight style={{ fontSize: "9px", marginLeft: "5px" }} />
            </button>
          </div>
        )}
        {restartBool && (
          <div className="controls">
            <button onClick={restartGame} className="restart">
              RESTART GAME
            </button>
          </div>
        )}
      </main>
      <div className="leaderboard">
        <h2>Leaderboard</h2>
        <p>Enter your Twitter name at the top of the screen to save your score on the leaderboard</p>
        <table className="table">
          <thead>
            <tr className="tr">
              <th className="nil">nil</th>
              <th>Player</th>
              <th>Ended at</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a href={`https://twitter.com/${user.username.slice(1)}`} target="blank">
                      {user.username}
                    </a>
                  </td>
                  <td>{user.ended}</td>
                  <td>&#128128;</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <audio className="left-ad" src="/audio/click.mp3"></audio>
      <audio className="break" src="/audio/break.mp3"></audio>
      <audio className="startaud" src="/audio/start.mp3"></audio>
      <audio className="successaud" src="/audio/success.wav"></audio>
    </div>
  );
};

export default Home;
