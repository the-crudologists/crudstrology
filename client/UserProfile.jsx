import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { ProfileImg, AstroButton, TarotCard } from './Styled.jsx';
import { UserContext } from './App.jsx';
import moment from 'moment';
import { newSign } from './NavBar.jsx';

const UserProfile = () => {
  const { state } = useLocation();
  const { user } = useContext(UserContext);
  const [followButton, setFollowButton] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);
  const [color, setColor] = useState('');
  const [signImage, setSignImage] = useState('');
  const [birthdayImage, setBirthdaySign] = useState('');
  const [sign, setSign] = useState('')
  const [dob, setDOB] = useState('')
  const [friendsList, setFriendsList] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [userFollowers, setUserFollowers] = useState([]);

  const getUser = () => {
    axios
      .get('/user/user')
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error('Failed request:', err);
      });
  };

  const getFollowersList = (id) => {
    axios
      .get(`/db/follow/list/${id}`)
      .then(({ data }) => {
        setFriendsList(data);
      })
      .catch((err) => {
        console.error('Failed request:', err);
      });
  };

  const getUserFollowersList = (id) => {
    axios
      .get(`/db/follow/list/${id}`)
      .then(({ data }) => {
        setUserFollowers(data);
      })
      .catch((err) => {
        console.error('Failed request:', err);
      });
  };

  const followUser = () => {
    const followB = document.getElementById('follow-button');
    const unFollowB = document.getElementById('unFollow-button');
    const message = document.getElementById('follow-status');

    const data = {
      user: state.currentUser.user_id,
    };

    axios
      .post('/follow', data)
      .then(() => {
        followB.style.display = 'none';
        unFollowB.style.display = '';
        message.style.display = '';
        getUserFollowersList(currentUser.user_id);

        setTimeout(() => {
          message.style.display = 'none';
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to send request:', err);
      });
  };

  const unFollowUser = () => {
    const followB = document.getElementById('follow-button');
    const unFollowB = document.getElementById('unFollow-button');
    const message = document.getElementById('un-follow-status');

    axios
      .delete(`/follow/${state.userId}`)
      .then(() => {
        followB.style.display = '';
        unFollowB.style.display = 'none';
        message.style.display = '';
        getUserFollowersList(currentUser.user_id);

        setTimeout(() => {
          message.style.display = 'none';
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to send request:', err);
      });
  };

  // Fetch friends list on render
  useEffect(() => {
    getUser();
    getFollowersList(state.userId);
  }, []);

  useEffect(() => {
    getUserFollowersList(currentUser.user_id);
  }, [currentUser]);

  // Disabling follow button if user is on their own profile
  useEffect(() => {
    const userButton = document.getElementById('userButton');
    const followButton = document.getElementById('follow-button');
    const unFollowButton = document.getElementById('unFollow-button');

    if (state.currentUser.name === currentUser.name) {
      userButton.style.display = '';
    } else {
      for (let i = 0; i < userFollowers.length; i++) {
        if (userFollowers[i].name === state.currentUser.name) {
          unFollowButton.style.display = '';
          followButton.style.display = 'none';
          break;
        } else {
          followButton.style.display = '';
          unFollowButton.style.display = 'none';
        }
      }
    }
  },[]);

  useEffect(() => {
    //Gets updated journal entries
   axios.get(`/db/profile/journal/${state.userId}`)
     .then(({data}) => setJournalEntries(data))
     .catch((err) => console.err(err));

     //Gets updated dob and sign
     axios.get(`db/updatedUser/${state.userId}`)
     .then(({data}) => {setSign(data[0].sign), setDOB(data[0].dob)})
  }, [])


useEffect(() => {
          //User zodiac sign
          if (sign) {
               //User color background
          (sign === "Aries" ? setColor('red' ): '');
          (sign === "Taurus" ? setColor('green') : '');
          (sign === "Gemini" ? setColor('yellow') : '');
          (sign === "Cancer" ? setColor('lightgray' ): '');
          (sign === "Leo" ? setColor('gold' ): '');
          (sign === "Virgo" ? setColor('darkgreen' ): '');
          (sign === "Libra" ? setColor('pink' ): '');
          (sign === "Scorpio" ? setColor('orange' ): '');
          (sign === "Sagittarius" ? setColor('violet' ): '');
          (sign === "Capricorn" ? setColor('brown' ): '');
          (sign === "Aquarius" ? setColor('dodgerblue' ): '');
          (sign === "Pisces" ? setColor('mediumseagreen' ): '');
          (sign === "Aries" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#c62828"/><circle cx="60.1" cy="63.1" r="56.1" fill="#ef5350"/><path fill="#e68c87" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".6"/><path fill="#fafafa" d="M104.9 45.5c-1.9-5-5.9-8.9-10.9-10.7-2.4-.9-4.9-1.3-7.3-1.3-10.3 0-18.9 8.1-19.6 18.4v.2c0 .5-.1.9-.1 1.4l-2.5 20.7c-.1.6-.9.6-1 0L60.9 53v-.8c-.4-10.5-9-18.8-19.6-18.8-2.7 0-5.4.5-8 1.6-4.4 1.8-7.9 5.3-9.8 9.6-1.4 3.3-2 6.8-1.7 10.2.1 1.5 1.5 2.7 3 2.7h1.5c.6 0 1.1-.1 1.6-.3 1.8-.8 2.8-2.4 2.8-4.1 0-2.4.8-4.7 2.4-7 1.3-1.8 3.2-3 5.4-3.4 1-.2 2-.3 2.9-.3 5.2 0 8.7 3.1 10.2 8.9.2.9.4 1.8.5 3.1l7.4 44.1c.2 2 1.6 3.6 3.5 4 .3.1.6.1 1 .1 2.3 0 4.2-1.7 4.5-4L76 53.2c1-6.8 4.9-10.8 10.7-10.8.7 0 1.4 0 2.1.2 2.8.4 5.2 2 6.7 4.3 1.5 2.4 2.1 5 1.8 7.5-.1.8.1 1.6.7 2.2s1.3.9 2.2.9h1.7c2.5 0 4.6-2 4.6-4.5-.2-2.4-.6-5-1.6-7.5z"/><path fill="#e68c87" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".3"/></svg>): '');
          (sign === "Taurus" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#e64a19"/><circle cx="60.1" cy="63.1" r="56.1" fill="#ff7043"/><path fill="#fff" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".3"/><path fill="#fafafa" d="M94.8 36.7c.6-1.4.4-3-.5-4.2s-2.3-2-3.8-2H90c-1.9 0-3.6 1.1-4.3 2.9-3.4 8.5-9.9 12.1-21.8 12.1s-18.4-3.6-21.8-12.1c-.7-1.8-2.4-2.9-4.3-2.9h-.5c-1.5 0-2.9.8-3.8 2-.9 1.2-1 2.8-.5 4.2 2.4 5.8 9 11.9 14.3 15.3-7.6 5.3-12.6 14.1-12.6 24.1 0 16.2 13.1 29.3 29.3 29.3s29.3-13.1 29.3-29.3c0-10.1-5.1-19-12.9-24.3 5.4-3.4 12.2-9.4 14.4-15.1zM64 96.5c-11.2 0-20.3-9.1-20.3-20.3S52.8 55.8 64 55.8s20.3 9.1 20.3 20.3S75.2 96.5 64 96.5z"/></svg>) : '');
          (sign === "Gemini" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#f57c00"/><circle cx="60.1" cy="63.1" r="56.1" fill="#ffa726"/><path fill="#f9cb8f" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".65"/><path fill="#fafafa" d="M84 84.1V43.9c0-.9.6-1.7 1.5-1.9 4.4-1 16.2-4.5 10.1-11-.5-.6-1.2-.9-2-1-1 0-1.9.3-2.7.8-2.1 1.6-4.5 2.8-7.1 3.4C79 35.2 74 36 64 36s-15-.8-19.9-1.8c-2.6-.5-5-1.7-7.1-3.4-.7-.6-1.7-.9-2.7-.9-.8 0-1.5.4-2 1-6.1 6.4 5.8 9.9 10.1 11 .9.2 1.5 1 1.5 1.9v40.1c0 .9-.6 1.7-1.5 1.9-3.8.9-13.1 3.7-11.7 8.8.5 1.7 2.2 3.2 4 3.2.9 0 1.7-.3 2.4-.9 2-1.6 4.4-2.8 6.9-3.3 4.9-1 9.9-1.8 20-1.8s15.1.8 20 1.8c2.5.5 4.9 1.7 6.9 3.3.7.5 1.5.9 2.4.9 1.8.1 3.5-1.4 4-3.2 1.4-5.1-7.9-7.9-11.7-8.8-1 0-1.6-.8-1.6-1.7zm-32-1.8V45.6c0-1.2 1-2.1 2.2-2 2.9.2 6.1.3 9.8.3 3.7 0 6.9-.1 9.8-.3 1.2-.1 2.2.8 2.2 2v36.7c0 1.2-1 2.1-2.2 2-2.9-.2-6.1-.3-9.8-.3s-6.9.1-9.8.3c-1.2.1-2.2-.8-2.2-2z"/><path fill="#f9cb8f" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".35"/></svg>) : '');
          (sign === "Cancer" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--twemoji" viewBox="0 0 36 36"><path fill="#9266CC" d="M36 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v28z"/><path fill="#FFF" d="M11 17.279c-2.813 0-5.28-2.467-5.28-5.279 0-3.878 3.779-6.279 7.28-6.279 13.634 0 17.007 6.433 17.145 6.707a1.28 1.28 0 0 1-2.282 1.157c-.06-.108-2.674-4.676-12.747-5.247.773.914 1.164 2.142 1.164 3.663-.001 2.538-2.019 5.278-5.28 5.278zm-1.166-8.01c-.922.653-1.556 1.597-1.556 2.731 0 1.232 1.214 2.721 2.722 2.721 1.627 0 2.721-1.407 2.721-2.72 0-1.056-.269-1.812-.799-2.247-.969-.794-2.593-.6-2.609-.597-.143.028-.313.046-.479.112zm13.165 21.01c-13.634 0-17.007-6.434-17.144-6.707a1.28 1.28 0 0 1 2.282-1.157c.06.108 2.674 4.677 12.746 5.247-.773-.913-1.163-2.141-1.163-3.662 0-2.539 2.019-5.279 5.279-5.279 2.812 0 5.28 2.467 5.28 5.279 0 3.879-3.779 6.279-7.28 6.279zm2-9c-1.628 0-2.721 1.407-2.721 2.721 0 1.056.269 1.812.799 2.247.97.794 2.673.6 2.688.597.142-.029.234-.062.399-.112.923-.653 1.556-1.598 1.556-2.731.001-1.233-1.213-2.722-2.721-2.722z"/><path fill="#9266CC" d="M14.002 11.99a3.04 3.04 0 1 0-6.08-.001 3.04 3.04 0 0 0 6.08.001zm14 12a3.04 3.04 0 1 0-6.08-.001 3.04 3.04 0 0 0 6.08.001z"/></svg>) : '');
          (sign === "Leo" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#fbc02d"/><circle cx="60.1" cy="63.1" r="56.1" fill="#fce438"/><path fill="#fff" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".6"/><path fill="#fafafa" d="M92.6 93.1c-.7-.3-1.4-.5-2.2-.5-.7 0-1.5.2-2.1.4-.7.3-2.6 1-4.9 1-.8 0-1.5-.1-2.2-.2-2.4-.5-3.8-1.8-4.4-4.3-1.9-7.4 2-12 7.9-18.9.6-.7 1.2-1.5 1.9-2.2.4-.5.9-1 1.3-1.5 5.4-6.4 8.2-9.7 8.2-19.3 0-6.4-1.7-11.9-5-16-4.2-5.1-10.8-7.9-19.6-8.1h-.7c-12.7 0-22.2 8.4-23.8 21 0 .2-.2.3-.3.3-1.8-.5-3.6-.7-5.4-.7-1.6 0-3.1.2-4.7.5-9 2.1-15.8 9.9-16.4 19.1-.4 5.9 1.6 11.6 5.6 15.9s9.6 6.7 15.5 6.7h1.2c10.2-.6 18.8-8.7 19.8-18.8.5-4.3-.4-8.6-2.5-12.4-2.6-4.7-2.4-11 .5-15.4C62 36.9 67 34 72.2 34h.8c7.1.4 12.6 6.4 12.6 13.6 0 4.5-1.7 7.8-7 14.1-.7.9-1.5 1.8-2.2 2.6-6.7 7.7-12.9 15.1-9.7 27.8 1.6 6.4 6.1 10.6 12.5 12 1.3.3 2.7.4 4.1.4 3.2 0 6.4-.7 9.2-1.9 1.8-.8 3-2.6 3.1-4.6 0-2-1.1-3.9-3-4.9zM51.7 66.6c-.6 4.7-4.5 8.6-9.2 9.2-.5.1-.9.1-1.4.1-3 0-6-1.3-8-3.6s-3-5.3-2.6-8.4c.6-4.7 4.5-8.6 9.2-9.2.5-.1.9-.1 1.4-.1 3 0 6 1.3 8 3.6 2.1 2.3 3 5.3 2.6 8.4z"/></svg>): '');
          (sign === "Virgo" ? setSignImage( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#689f38"/><circle cx="60.1" cy="63.1" r="56.1" fill="#9ccc65"/><path fill="#bfe094" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".3"/><path fill="#fafafa" d="M91.4 96.7c-3.5-1-7-3.9-8.5-8.1-.1-.4-.1-.8.2-1.1 11.4-11.1 20-25.4 19.8-35.8-.1-6.2-3.2-10.8-8.7-12.8-4.8-1.8-9-1.2-12.4.3-.6.3-1.2-.1-1.4-.7-1.6-7.2-8-12.5-15.6-12.5-4.4 0-8.4 1.8-11.3 4.7-.4.4-1 .4-1.4 0-3-3-7.2-4.9-11.8-4.7-8.5.3-15.5 7.9-15.5 16.4v43.4c0 2.1 1.5 3.9 3.6 4.2 2.4.2 4.4-1.6 4.4-4V42.3c0-4.3 3.2-8 7.5-8.3 4.7-.3 8.5 3.4 8.5 8v43.8c0 2.1 1.5 3.9 3.6 4.2 2.4.2 4.4-1.6 4.4-4V42.3c0-4.3 3.2-8 7.5-8.3 4.7-.3 8.6 3.4 8.6 8 0 0-.1 38.8.7 42.8.1.4-.1.7-.3 1-4.3 3.6-9 6.5-13.7 8.4-1.9.8-3.1 2.9-2.5 4.9.5 1.8 2.1 2.8 3.8 2.8.5 0 1-.1 1.5-.3 4.4-1.8 8.8-4.4 13.1-7.6.5-.4 1.2-.2 1.5.3 1.9 4.2 6 9 12.5 10.4.3.1.5.1.8.1 2.2 0 4.7-2.3 4.5-4.8-.2-1.6-1.7-2.9-3.4-3.3zm4.5-43.5c-1.6 9-8.9 19.3-14.9 24.9-.5-5.5-1.5-24.4.2-28.4 4.6-9.8 16.1-4.2 14.7 3.5z"/><path fill="#bfe094" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".65"/></svg>): '');
          (sign === "Libra" ? setSignImage( <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#388e3c"/><circle cx="60.1" cy="63.1" r="56.1" fill="#66bb6a"/><path fill="#fff" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".3"/><g fill="#fafafa"><path d="M95.5 94.2h-63c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5h63c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5zM95.4 69.1h-8.2c3.5-5.2 5.1-11.5 4.6-17.8C90.7 37.7 79.6 26.8 66 25.8c-.7 0-1.3-.1-2-.1-7.5 0-14.5 2.9-19.7 8.2-5.3 5.3-8.2 12.3-8.2 19.7 0 5.5 1.6 10.8 4.6 15.4H32c-2.5 0-4.6 2.1-4.6 4.6s2.1 4.6 4.6 4.6h20.3c1.6 0 2.9-1.3 2.9-2.9v-3.4c0-1-.5-1.9-1.4-2.5-.1-.1-.2-.1-.2-.2-5.9-3.9-9.1-10.8-8.3-17.9 1-8.5 7.9-15.4 16.5-16.3.7-.1 1.5-.1 2.2-.1 10.3 0 18.8 8.4 18.8 18.8 0 6.3-3.1 12.1-8.4 15.6-.1.1-.2.1-.2.2-.8.5-1.4 1.5-1.4 2.5v3.4c0 1.6 1.3 2.9 2.9 2.9h19.8c2.5 0 4.6-2.1 4.6-4.6-.1-2.6-2.2-4.6-4.7-4.6z"/></g></svg> ): '');
          (sign === "Scorpio" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#26a69a"/><circle cx="64" cy="64" r="60" fill="#00796b"/><circle cx="60.1" cy="63.1" r="56.1" fill="#26a69a"/><path fill="#fff" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".3"/><path fill="#fafafa" d="m109.6 76.4-6-8c-.7-1.5-2.8-1.5-3.6 0l-6 8c-.7 1.3.3 2.9 1.8 2.9h2v.1c0 3.4-1.2 6.2-3.5 7.4-1.7.9-10.9 1.8-10.2-19.7V45.3c0-8.7-6.8-16.1-15.5-16.4-4.6-.1-8.7 1.6-11.7 4.6-.4.4-1.1.4-1.6 0-3-3-7.2-4.8-11.7-4.6-8.7.3-15.5 7.7-15.5 16.4v43.4c0 2.1 1.5 3.9 3.6 4.2 2.4.2 4.4-1.6 4.4-4V45.1c0-4.3 3.2-8 7.5-8.3 4.7-.3 8.5 3.4 8.5 8v43.8c0 2.1 1.5 3.9 3.6 4.2 2.4.2 4.4-1.6 4.4-4V45.1c0-4.3 3.2-8 7.4-8.3 4.7-.3 8.6 3.4 8.6 8 0 0-.1 19.2-.1 20.6 0 8.8-.9 23.5 9.7 28.6 5.3 2.5 11.1.4 13.1-.9 4.2-2.8 6.8-8.6 6.9-13.8h2c1.6 0 2.6-1.6 1.9-2.9z"/></svg>): '');
          (sign === "Sagittarius" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#0d47a1"/><circle cx="60.1" cy="63.1" r="56.1" fill="#1976d2"/><path fill="#fff" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".3"/><path fill="#fafafa" d="M92 34H64.2c-2.1 0-4 1.5-4.2 3.6-.2 2.4 1.7 4.4 4 4.4h15.8c.9 0 1.3 1.1.7 1.7L59 64.8c-.8.8-2 .8-2.8 0l-9.7-9.6c-1.6-1.6-4.1-1.6-5.7 0-1.6 1.6-1.6 4.1 0 5.7l9.7 9.6c.8.8.8 2.1 0 2.8L33.3 91c-1.5 1.5-1.8 4.1-.3 5.7 1.5 1.7 4.2 1.8 5.8.2l17.5-18c.8-.8 2-.8 2.8 0l10.1 10c1.6 1.6 4.1 1.6 5.7 0s1.6-4.1 0-5.7l-10.1-10c-.8-.8-.8-2.1 0-2.8l21.6-21.1c.6-.6 1.7-.2 1.7.7v15.9c0 2.1 1.5 3.9 3.6 4.2 2.4.2 4.4-1.6 4.4-4V38c-.1-2.2-1.9-4-4.1-4z"/></svg>): '');
          (sign === "Capricorn" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#5e35b1"/><circle cx="60.1" cy="63.1" r="56.1" fill="#7e57c2"/><path fill="#5e35b1" d="M94.8 84.1c-1.6.8-3.4 1.6-6.5 1.6-2 0-4.6-.4-8.1-1.3-.4-.1-.6-.4-.6-.8-.1-8 1.8-12.1 3.6-14.2 1.8-2 3.4-3.1 6.5-3.1h.3c3 0 5.3 1.3 7.5 4 5.5 6.5-.4 12.7-2.7 13.8z" opacity=".2"/><path fill="#a08ccf" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".65"/><path fill="#fafafa" d="M103.9 65.3c-3.5-5.1-7.8-7-13.5-7-15.6.1-18.5 16.1-18.7 22.5 0 .3-.3.5-.6.4l-1.1-.5c-2-.7-2.8-4.8-3-7.4V44.6c0-8.7-6.8-16.1-15.5-16.4-5-.2-9.5 2-12.5 5.4-1.1-1.2-2.3-2.3-3.8-3.1-2.1-1.3-4.9-.5-5.8 1.8-.8 1.9 0 4 1.6 5 2.4 1.4 4 4 4 6.9V82c0 2.1 1.5 3.9 3.6 4.2 2.4.2 4.4-1.6 4.4-4V44.4c0-4.3 3.2-8 7.5-8.3 4.7-.3 8.5 3.4 8.5 8v30c.3 3.8 1.6 11.6 8.2 14.1.2.1.5.2.9.3.8.3 2 .8 3.3 1.3.4.1.6.4.7.8s.1.8.2 1.2c.4 3.1-.6 4.2-2.3 4.9-3.1 1.4-8 1.1-12.3.2-2.5-.5-4.8 1.4-4.8 3.9 0 1.9 1.3 3.5 3.2 3.9 1.4.3 2.8.5 4.2.7 1.3.1 2.7.2 4.1.2 3.7 0 7.8-.6 10.9-2.8 3.2-2.2 5-5.7 5-9.9 0-.3.2-.5.5-.4 22.5 6.4 31.2-15.4 23.1-27.2zm-9.1 18.8c-2.7 1.3-5.9 2.7-14.6.2-.4-.1-.6-.4-.6-.8-.1-8 1.8-12.1 3.6-14.2 1.8-2 3.4-3.1 6.5-3.1 3.1-.1 5.5 1.2 7.8 3.9 5.5 6.6-.4 12.9-2.7 14z"/><path fill="#a08ccf" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".3"/></svg>): '');
          (sign === "Aquarius" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#7b1fa2"/><circle cx="60.1" cy="63.1" r="56.1" fill="#ab47bc"/><path fill="#fff" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".3"/><g fill="#fafafa"><path d="M100 64c-1.4 0-2.7-.7-3.4-1.9l-7.7-12.9c-.4-.7-1.3-.7-1.7 0l-7.7 12.7c-.5.8-1.3 1.5-2.2 1.8-1.8.6-3.8-.2-4.7-1.7l-7.7-12.9c-.4-.7-1.3-.7-1.7 0l-7.7 12.7c-.5.8-1.3 1.5-2.2 1.8-1.8.6-3.8-.2-4.7-1.7L40.9 49c-.4-.7-1.3-.7-1.7 0l-7.6 12.7c-1.1 1.8-3.3 2.6-5.2 1.7-2.2-1-2.9-3.7-1.7-5.7l11.9-19.9c.5-.8 1.3-1.5 2.2-1.8 1.8-.6 3.8.2 4.7 1.7l7.7 12.9c.4.7 1.3.7 1.7 0l7.6-12.7c.5-.8 1.3-1.5 2.2-1.8 1.8-.6 3.8.2 4.7 1.7l7.7 12.9c.4.7 1.3.7 1.7 0L84.5 38c.5-.8 1.3-1.5 2.2-1.8 1.8-.6 3.8.2 4.7 1.7l11.9 19.9c1.1 1.8.7 4.2-1 5.4-.6.6-1.5.8-2.3.8z"/><path d="M100 92c-1.4 0-2.7-.7-3.4-1.9l-7.7-12.9c-.4-.7-1.3-.7-1.7 0l-7.7 12.7c-.5.8-1.3 1.5-2.2 1.8-1.8.6-3.8-.2-4.7-1.7l-7.7-12.9c-.4-.7-1.3-.7-1.7 0l-7.7 12.7c-.5.8-1.3 1.5-2.2 1.8-1.8.6-3.8-.2-4.7-1.7L40.9 77c-.4-.7-1.3-.7-1.7 0l-7.6 12.7c-1.1 1.8-3.3 2.6-5.2 1.7-2.2-1-2.9-3.7-1.7-5.7l11.9-19.9c.5-.8 1.3-1.5 2.2-1.8 1.8-.6 3.8.2 4.7 1.7l7.7 12.8c.4.7 1.3.7 1.7 0L60.5 66c.5-.8 1.3-1.5 2.2-1.8 1.8-.6 3.8.2 4.7 1.7l7.7 12.8c.4.7 1.3.7 1.7 0L84.5 66c.5-.8 1.3-1.5 2.2-1.8 1.8-.6 3.8.2 4.7 1.7l11.9 19.8c1.1 1.8.7 4.2-1 5.4-.6.7-1.5.9-2.3.9z"/></g></svg>): '');
          (sign === "Pisces" ? setSignImage(<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" aria-hidden="true" class="iconify iconify--noto" viewBox="0 0 128 128"><circle cx="64" cy="64" r="60" fill="#c2185b"/><circle cx="60.1" cy="63.1" r="56.1" fill="#ec407a"/><path fill="#e380a1" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".65"/><path fill="#fafafa" d="M96.6 60H86c-.6 0-1.1-.5-1-1.1 1.1-11.8 5.7-20 9.7-22.3 1.3-.7 2.1-2.1 2.1-3.6-.1-3-3.3-4.9-5.9-3.4-7.3 4-12.8 15.5-13.9 29.5-.1.5-.5.9-1 .9H52c-.5 0-1-.4-1-.9-1-13.7-6.4-25-13.5-29.2-2.6-1.6-5.5-.6-6.2 2.3-.4 1.8.4 3.6 1.9 4.4 4 2.2 8.7 10.5 9.8 22.3 0 .6-.4 1.1-1 1.1H31.4c-2.1 0-4 1.5-4.1 3.6C27 66 28.9 68 31.2 68H42c.6 0 1 .5 1 1.1-1.1 11.8-5.7 20-9.7 22.3-1.3.7-2.1 2.1-2.1 3.6.1 3 3.3 4.8 5.9 3.4 7.3-4.1 12.8-15.5 13.9-29.5 0-.5.5-.9 1-.9h24c.5 0 .9.4 1 .9 1 13.7 6.4 25 13.5 29.2 2.6 1.6 5.5.7 6.2-2.3.4-1.8-.4-3.6-1.9-4.4-4-2.2-8.7-10.4-9.8-22.3 0-.6.4-1.1 1-1.1h10.8c2.3 0 4.2-2 4-4.4-.2-2.1-2.1-3.6-4.2-3.6z"/><path fill="#e380a1" d="M24 29.7c4.5-7.1 14.1-13 24.1-14.8 2.5-.4 5-.6 7.1.2 1.6.6 2.9 2.1 2 3.8-.7 1.4-2.6 2-4.1 2.5-9.3 3-17.9 6.4-23.1 14.3-2 3-4.9 14.4-8.6 12.3-3.9-2.3-3.1-9.5 2.6-18.3z" opacity=".3"/></svg>): '');
          }
          //User birthday cake
          if (dob) {
      setBirthdaySign(<svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" class="icon" viewBox="0 0 1024 1024"><path fill="#FDE8C2" d="M883.2 358.4c0-14.08-11.52-25.6-25.6-25.6H166.4c-14.08 0-25.6 11.52-25.6 25.6V512h742.4V358.4z"/><path fill="#231C1C" d="M883.2 524.8H140.8c-7.68 0-12.8-5.12-12.8-12.8V358.4c0-21.76 16.64-38.4 38.4-38.4h691.2c21.76 0 38.4 16.64 38.4 38.4V512c0 7.68-5.12 12.8-12.8 12.8zm-729.6-25.6h716.8V358.4c0-7.68-5.12-12.8-12.8-12.8H166.4c-7.68 0-12.8 5.12-12.8 12.8v140.8z"/><path fill="#6FB0BE" d="M140.8 870.4c0 14.08 11.52 25.6 25.6 25.6h691.2c14.08 0 25.6-11.52 25.6-25.6V704H140.8v166.4z"/><path fill="#231C1C" d="M857.6 908.8H166.4c-21.76 0-38.4-16.64-38.4-38.4V704c0-7.68 5.12-12.8 12.8-12.8h742.4c7.68 0 12.8 5.12 12.8 12.8v166.4c0 21.76-16.64 38.4-38.4 38.4zm-704-192v153.6c0 7.68 5.12 12.8 12.8 12.8h691.2c7.68 0 12.8-5.12 12.8-12.8V716.8H153.6z"/><path fill="#E1E0A6" d="M140.8 512h742.4v192H140.8z"/><path fill="#231C1C" d="M883.2 716.8H140.8c-7.68 0-12.8-5.12-12.8-12.8V512c0-7.68 5.12-12.8 12.8-12.8h742.4c7.68 0 12.8 5.12 12.8 12.8v192c0 7.68-5.12 12.8-12.8 12.8zm-729.6-25.6h716.8V524.8H153.6v166.4z"/><path fill="#F29B54" d="M883.2 345.6H140.8V512h89.6v51.2c0 14.08 11.52 25.6 25.6 25.6h12.8c14.08 0 25.6-11.52 25.6-25.6V512h115.2v192c0 14.08 11.52 25.6 25.6 25.6H448c14.08 0 25.6-11.52 25.6-25.6V512h89.6v89.6c0 14.08 11.52 25.6 25.6 25.6h12.8c14.08 0 25.6-11.52 25.6-25.6V512h115.2v140.8c0 14.08 11.52 25.6 25.6 25.6h12.8c14.08 0 25.6-11.52 25.6-25.6V512h76.8V345.6z"/><path fill="#231C1C" d="M448 742.4h-12.8c-21.76 0-38.4-16.64-38.4-38.4V524.8h-89.6v38.4c0 21.76-16.64 38.4-38.4 38.4H256c-21.76 0-38.4-16.64-38.4-38.4v-38.4h-76.8c-7.68 0-12.8-5.12-12.8-12.8V345.6c0-7.68 5.12-12.8 12.8-12.8h742.4c7.68 0 12.8 5.12 12.8 12.8V512c0 7.68-5.12 12.8-12.8 12.8h-64v128c0 21.76-16.64 38.4-38.4 38.4H768c-21.76 0-38.4-16.64-38.4-38.4v-128H640v76.8c0 21.76-16.64 38.4-38.4 38.4h-12.8c-21.76 0-38.4-16.64-38.4-38.4v-76.8h-64V704c0 21.76-16.64 38.4-38.4 38.4zM294.4 499.2h115.2c7.68 0 12.8 5.12 12.8 12.8v192c0 7.68 5.12 12.8 12.8 12.8H448c7.68 0 12.8-5.12 12.8-12.8V512c0-7.68 5.12-12.8 12.8-12.8h89.6c7.68 0 12.8 5.12 12.8 12.8v89.6c0 7.68 5.12 12.8 12.8 12.8h12.8c7.68 0 12.8-5.12 12.8-12.8V512c0-7.68 5.12-12.8 12.8-12.8h115.2c7.68 0 12.8 5.12 12.8 12.8v140.8c0 7.68 5.12 12.8 12.8 12.8h12.8c7.68 0 12.8-5.12 12.8-12.8V512c0-7.68 5.12-12.8 12.8-12.8h64V358.4H153.6v140.8h76.8c7.68 0 12.8 5.12 12.8 12.8v51.2c0 7.68 5.12 12.8 12.8 12.8h12.8c7.68 0 12.8-5.12 12.8-12.8V512c0-7.68 5.12-12.8 12.8-12.8z"/><path fill="#231C1C" d="M307.2 243.2h25.6v102.4h-25.6z"/><path fill="#FAC546" d="M358.4 204.8c0 21.76-16.64 38.4-38.4 38.4s-38.4-16.64-38.4-38.4S298.24 128 320 128s38.4 55.04 38.4 76.8z"/><path fill="#231C1C" d="M320 256c-28.16 0-51.2-23.04-51.2-51.2 0-17.92 15.36-89.6 51.2-89.6s51.2 71.68 51.2 89.6c0 28.16-23.04 51.2-51.2 51.2zm0-115.2c-8.96 1.28-25.6 42.24-25.6 64 0 14.08 11.52 25.6 25.6 25.6s25.6-11.52 25.6-25.6c0-21.76-16.64-62.72-25.6-64zm179.2 102.4h25.6v102.4h-25.6z"/><path fill="#FAC546" d="M550.4 204.8c0 21.76-16.64 38.4-38.4 38.4s-38.4-16.64-38.4-38.4S490.24 128 512 128s38.4 55.04 38.4 76.8z"/><path fill="#231C1C" d="M512 256c-28.16 0-51.2-23.04-51.2-51.2 0-17.92 15.36-89.6 51.2-89.6s51.2 71.68 51.2 89.6c0 28.16-23.04 51.2-51.2 51.2zm0-115.2c-8.96 1.28-25.6 42.24-25.6 64 0 14.08 11.52 25.6 25.6 25.6s25.6-11.52 25.6-25.6c0-21.76-16.64-62.72-25.6-64zM691.2 243.2h25.6v102.4h-25.6z"/><path fill="#FAC546" d="M742.4 204.8c0 21.76-16.64 38.4-38.4 38.4s-38.4-16.64-38.4-38.4S682.24 128 704 128s38.4 55.04 38.4 76.8z"/><path fill="#231C1C" d="M704 256c-28.16 0-51.2-23.04-51.2-51.2 0-17.92 15.36-89.6 51.2-89.6s51.2 71.68 51.2 89.6c0 28.16-23.04 51.2-51.2 51.2zm0-115.2c-8.96 1.28-25.6 42.24-25.6 64 0 14.08 11.52 25.6 25.6 25.6s25.6-11.52 25.6-25.6c0-21.76-16.64-62.72-25.6-64z"/></svg>);
         }

}, [sign])

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '20px',
        border: '1px solid black',
        width: '100%',
        height: '600px',
        maxHeight: '600px',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          'border-style': 'solid',
          maxHeight: '100%',
          overflow: 'hidden'
        }}
      >
        <ProfileImg
          src={`https://robohash.org/${state.currentUser.name}?set=set5`}
          style={{ marginLeft: '100px', padding: '10px', backgroundColor:`${color}`}}
        />
        <div name='user-info' style={{ textAlign: 'center' }}>
          <h1 className='comp-title'>{state.currentUser.name}</h1>
          <AstroButton
            id='userButton'
            style={{
              color: 'black',
              margin: 'auto',
              padding: '10px',
              backgroundColor: 'green',
              display: 'none'
            }}
          >
            You
          </AstroButton>

          <AstroButton
            id='follow-button'
            style={{ color: 'black', margin: 'auto', padding: '10px', display: 'none' }}
            type='button'
            onClick={() => followUser()}
          >
            Follow
          </AstroButton>

          <AstroButton
            id='unFollow-button'
            style={{
              color: 'black',
              margin: 'auto',
              padding: '10px',
              display: 'none',
            }}
            type='button'
            onClick={() => unFollowUser()}
          >
            UnFollow
          </AstroButton>

          <p id='follow-status' style={{ display: 'none' }}>
            You are following {state.currentUser.name}
          </p>
          <p id='un-follow-status' style={{ display: 'none' }}>
            You un-followed {state.currentUser.name}
          </p>
          <h2 className='comp-sign'>{signImage} {sign}</h2>
          <h2 className='comp-sign'>{birthdayImage} {dob}</h2>
        </div>
      </div>
      {/* <Link to='/'>Go Back</Link> */}
      <div
        style={{
          display: 'inline-block',
          borderStyle: 'solid',
          maxHeight: '100%',
          overflow: 'auto'
        }}
      >
        {journalEntries.map((entry) => {
          return (
            <TarotCard>
            <div style={{textAlign: "center"}}>
            <h2>{entry.title}</h2>

                 <div dangerouslySetInnerHTML={{ __html: entry.body }}/>
                 <br></br>
                {moment(entry.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
              </div>
            </TarotCard>
          );
        })}
      </div>
      <div
        style={{
          display: 'inline-block',
          'border-style': 'solid',
          maxHeight: '100%',
          overflow: 'hidden'
        }}
      >
        <h1 style={{ textAlign: 'center' }}>
          <u>Followers</u>
        </h1>
        <div style={{ overflow: 'auto', textAlign: 'center', maxHeight: '85%'}}>
          {friendsList.map((friend, i) => {
            return (
              <div className='quote' style={{ display: 'flex' }}>
                <ProfileImg
                  src={`https://robohash.org/${friend.name}?set=set5`}
                  style={{
                    marginLeft: '125px',
                    marginBottom: '20px',
                    height: '75px',
                  }}
                />
                <h2 style={{ marginLeft: '30px', marginTop: '41px' }}>
                  {friend.name}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
