import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import './About.css';

const About = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };
  return (
    <Box
      className="about-box"
      sx={{
        dir: 'rtl',
        maxWidth: '900px',
        marginTop:'50px',
        textAlign: 'right',
        color: '#7bd0f8',
        backgroundColor: '#ffffffb3',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
      }}
    >
      <Box sx={{ flex: 1, marginRight: '20px' }}>
        <Typography
          variant="h3"
          dir="rtl"
          component="h1"
          gutterBottom
          sx={{ textAlign: 'right', color: '#0878bb' }}
        >
          אודות - Sweet Suite
        </Typography>



        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: 'right',
            dir: "rtl",
            color: '#0878bb',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            padding: '20px',
            borderRadius: '10px',
            backgroundColor: '#F9ECEC',
            marginBottom: '20px',
            border: '2px solid #7bd0f8',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
            marginLeft: '10%',
          }}
        >
          ברוכים הבאים ל-Sweet Suite, המקום שבו החלומות שלכם לחופשה מפנקת הופכים למציאות!
          אנחנו מתמחים בהשכרת סוויטות יוקרתיות שמעניקות חוויה יוצאת דופן לכל אורח, עם דגש על נוחות, איכות ושירות אישי.
        </Typography>



        <Box sx={{ marginBottom: '20px' }}>
          <Typography
            variant="h6"
            component="h2"
            onClick={() => toggleSection('whatWeOffer')}
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '10px',
              textAlign: 'right',
              color: '#ff9800'
            }}
          >
            מה אנחנו מציעים?
            <span style={{ color: '#4caf50' }}>{openSection === 'whatWeOffer' ? '-' : '+'}</span>
          </Typography>
          {openSection === 'whatWeOffer' && (
            <List sx={{ textAlign: 'right' }}>
              <ListItem>
                <ListItemText
                  primary="מבחר סוויטות ייחודיות"
                  secondary="באתר שלנו תמצאו סוויטות במגוון סגנונות, החל ממתחמי ספא מפנקים ועד לנופים עוצרי נשימה"
                  sx={{ textAlign: 'right' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="אבזור מלא"
                  secondary="כל סוויטה מאובזרת ברמה הגבוהה ביותר: טלוויזיה, מטבחון, מיזוג אוויר, חניה פרטית, ואפילו נוף לים למי שרוצה"
                  sx={{ textAlign: 'right' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="חוות דעת ודירוגים"
                  secondary="אנחנו מקפידים לשקף את חוות הדעת של האורחים, כדי שתוכלו לבחור בביטחון את הסוויטה שהכי מתאימה לכם"
                  sx={{ textAlign: 'right' }}
                />
              </ListItem>
            </List>
          )}
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <Typography
            variant="h6"
            component="h2"
            onClick={() => toggleSection('whyChooseUs')}
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '10px',
              textAlign: 'right',
              color: '#ff9800'
            }}
          >
            למה לבחור בנו?
            <span style={{ color: '#4caf50' }}>
              {openSection === 'whyChooseUs' ? '-' : '+'}
            </span>
          </Typography>

          {openSection === 'whyChooseUs' && (
            <List sx={{ textAlign: 'right' }}>
              <ListItem>
                <ListItemText
                  primary="שירות ללא פשרות"
                  secondary="אנחנו כאן כדי להקשיב, לעזור ולוודא שהחופשה שלכם תהיה בלתי נשכחת"
                  sx={{ textAlign: 'right' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="התאמה אישית"
                  secondary="צריכים סוויטה עם בריכה? יש לנו פתרונות לכל מטרה"
                  sx={{ textAlign: 'right' }}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="תהליך פשוט ומהיר"
                  secondary="עם ממשק ידידותי ומערכת סינון חכמה, תוכלו למצוא את הסוויטה המושלמת בכמה קליקים בלבד"
                  sx={{ textAlign: 'right' }}
                />
              </ListItem>
            </List>
          )}
        </Box>

        <Box sx={{ marginBottom: '20px' }}>
          <Typography
            variant="h6"
            component="h2"
            onClick={() => toggleSection('contactUs')}
            sx={{
              cursor: 'pointer',
              fontWeight: 'bold',
              marginBottom: '10px',
              textAlign: 'right',
              color: '#ff9800'
            }}
          >
            בואו להתארח אצלנו!
            <span style={{ color: '#4caf50' }}>
              {openSection === 'contactUs' ? '-' : '+'}
            </span>
          </Typography>

          {openSection === 'contactUs' && (
            <Typography sx={{ textAlign: 'right' }}>
              אנחנו מאמינים שחופשה מוצלחת מתחילה בבחירה נכונה. תנו לנו להיות הבחירה שלכם, ונדאג לכל השאר<br />
              <strong>🍭צרו קשר</strong> <br />
              טלפון: 1-800-555-777 <br />
              sweetsuite.shira@gmail.com.com
            </Typography>
          )}
        </Box>
      </Box>

      {/* תמונה בצד */}
      <Box sx={{ width: '250px', height: '400px', borderRadius: '10px', overflow: 'hidden' }}>
        <img
          src="/GIF2.gif"
          alt="Decoration"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            opacity: 0.4,
          }}
        />
      </Box>

    </Box>
  );
};

export default About;