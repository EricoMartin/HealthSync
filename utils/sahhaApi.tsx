import axios from 'axios';

const getAccessToken = async () => {
  try {
    const res = await axios.post('https://sandbox-api.sahha.ai/api/v1/oauth/account/token', {
      clientId: 'RAKHYIGZsdCeYzfR6BYb3WplP371rT3k', //CLIENT_ID,
      clientSecret: 'Wnkowq6Mt0UVDZWaTIAhzK8jirUlZnLo5p3DskwelD0Gbu803DuNId9n7Ps8r8hv', //CLIENT_SECRET,
    });

    console.log(res.data.accountToken);
    return res.data.accountToken;
  } catch (err) {
    console.error('Error fetching token:', err);
  }
};

export const fetchSahhaScores = async () => {
  const token = await getAccessToken();
  const profile_id = 'SampleProfile-9d44daa2-5d96-4ddd-ba88-7cd0c290c24d';
  const response = await fetch(
    `https://sandbox-api.sahha.ai/api/v1/profile/biomarker/${profile_id}?categories=sleep&categories=activity`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `account ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Error fetching Sahha scores');
  }
  const data = await response.json();
  console.log(data);
  return data;
};
