export const HOME_PAGE = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Backend NestJS API - E-commerce FST53</title>
    <style>

    <style>

    * {
      margin:0;
      padding:0
    }
      
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: url("https://res.cloudinary.com/de5tm90td/image/upload/v1727530385/ompras_uxl65b.png") no-repeat center center;
            background-size: cover;
            margin: 0;
        }
        img {
            width:6rem;
            height:6rem;
            border-radius:6rem;
            
        }
        .card {
            width:30%;
            margin:0 auto;
            background-color: rgba(123,234,234,50);
            border-radius: 0.75em;
            display:flex;
            padding:4rem;
            justify-content:center;
            cursor: pointer;
            transition: ease 0.2s;
            box-shadow: 1em 1em 1em #d8dae0b1, -0.75em -0.75em 1em #ffffff;
            border: 1.5px solid #f2f3f7;
          }
          
          .card:hover {
            background-color: #d3ddf1;
            border: 1.5px solid #1677ff;
          }
          
          .container {
            margin-top: 1.25em;
            margin-bottom: 1.375em;
            margin-left: 1.375em;
            margin-right: 2em;
            display: flex;
            flex-wrap:wrap;
            flex-direction: row;
            gap: 0.75em;
          }
          
          .status-ind {
            width: 0.625em;
            height: 0.625em;
            background-color: green;
            margin: 0.375em 0;
            border-radius: 0.5em;
          }
          
          .text-wrap-father {
            display: flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            gap:1rem;
            width:80%;
            margin:0 auto;
          }
          .text-wrap {
            display: flex;
            flex-direction: column;
            gap: 0.25em;
            color: #333;
          }
          
          .time {
            font-size: 0.875em;
            color: #777;
          }
          
          .text-link {
            font-weight: 500;
            text-decoration: none;
            color: black;
          }
          
          .button-wrap {
            display: flex;
            flex-direction: row;
            justify-content:center;
            gap: 1em;
            align-items: center;          }
          
          .secondary-cta {
            background-color: transparent;
            border: none;
            font-size: 15px;
            font-weight: 400;
            color: #666;
            cursor: pointer;
          }
          
          .primary-cta {
            font-size: 15px;
            background-color: transparent;
            font-weight: 600;
            color: #1677ff;
            border: none;
            border-radius: 1.5em;
            cursor: pointer;
          }
          
          button:hover {
            text-decoration: underline;
          }
          
          .right {
            display: flex;
            flex-direction: column;
            gap: 0.875em;
          }
        .codepen-button {
            display: block;
            width:20rem;
            cursor: pointer;
            color: white;
            margin: 0 auto;
            position: relative;
            text-decoration: none;
            font-weight: 600;
            border-radius: 25px;
            overflow: hidden;
            padding: 3px;
            isolation: isolate;
          }
          
          .codepen-button::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 400%;
            height: 100%;
            background: linear-gradient(115deg,#4fcf70,#fad648,#a767e5,#12bcfe,#44ce7b);
            background-size: 25% 100%;
            animation: an-at-keyframe-css-at-rule-that-translates-via-the-transform-property-the-background-by-negative-25-percent-of-its-width-so-that-it-gives-a-nice-border-animation_-We-use-the-translate-property-to-have-a-nice-transition-so-it_s-not-a-jerk-of-a-start-or-stop .75s linear infinite;
            animation-play-state: paused;
            translate: -5% 0%;
            transition: translate 0.25s ease-out;
          }
          
          .codepen-button:hover::before {
            animation-play-state: running;
            transition-duration: 0.75s;
            translate: 0% 0%;
          }
          
          @keyframes an-at-keyframe-css-at-rule-that-translates-via-the-transform-property-the-background-by-negative-25-percent-of-its-width-so-that-it-gives-a-nice-border-animation_-We-use-the-translate-property-to-have-a-nice-transition-so-it_s-not-a-jerk-of-a-start-or-stop {
            to {
              transform: translateX(-25%);
            }
          }
          
          .codepen-button span {
            position: relative;
            display: block;
            padding: 1rem 1.5rem;
            font-size: 1.1rem;
            background: #000;
            border-radius: 3px;
            height: 100%;
          }
          .wrapper {
            display: flex;
            justify-content: center;
            list-style: none;
            height: 120px;
            width: 100%;
            padding:0
        }
        .wrapper .icon {
            position: relative;
            background: #fff;
            border-radius: 50%;
            margin: 10px;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        .wrapper .tooltip {
            position: absolute;
            bottom: 60px; /* Position above the icon */
            left: 50%;
            transform: translateX(-50%);
            font-size: 14px;
            background: #fff;
            color: #333;
            padding: 5px 8px;
            border-radius: 5px;
            box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s;
        }

        

        
        .wrapper .icon:hover .tooltip {
            opacity: 1;
            pointer-events: auto;
        }
        .wrapper .github:hover .tooltip {
            background: #e4405f;
            color: #fff;
        }

        .wrapper .linkedin:hover .tooltip {
          background: #e4405f;
          color: #fff;
      }
      .wrapper .dailydev:hover .tooltip {
        background: #e4405f;
        color: #fff;
    }
      
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: url("https://res.cloudinary.com/de5tm90td/image/upload/v1727530385/ompras_uxl65b.png") no-repeat center center;
            background-size: cover;
            margin: 0;
        }
        .card {
            width: 30%;
            background-color: rgba(123, 234, 234, 0.5);
            border-radius: 0.75em;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 4rem;
            cursor: pointer;
            transition: ease 0.2s;
            box-shadow: 1em 1em 1em #d8dae0b1, -0.75em -0.75em 1em #ffffff;
            border: 1.5px solid #f2f3f7;
        }
        .card:hover {
            background-color: #d3ddf1;
            border: 1.5px solid #1677ff;
        }
        img {
            width: 6rem;
            height: 6rem;
            border-radius: 50%;
            margin-bottom: 1rem;
        }
        .text-wrap {
          text-align: center;
          color: #333;
      }
      
      
      
    </style>
</head>
<body>
<div class="card">
<img src='https://res.cloudinary.com/de5tm90td/image/upload/v1727547509/1358421431995thumbnail_htgzvi.jpg' alt="Logo">
<div class="text-wrap">
    <h1>Bienvenido al proyecto backend NestJS API</h1>
    <p>Omar Villadiego Carrascal</p>
    <h2>E-commerce API</h2>
    <p>Henry - Full Stack</p>
</div>
<div class="button-wrap">
    <a class="codepen-button" href="/api"><span>Ver documentación de la API</span></a>
</div>
<ul class="wrapper">
    <li class="icon github">
        <a href="https://github.com/omaryesithvilladiego">
            <span class="tooltip">GitHub</span>
            <svg viewBox="0 0 16 16" height="1.2em" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.39 0-.19-.01-.75-.01-1.36-2.24.49-2.71-1.08-2.71-1.08-.36-.91-.87-1.15-.87-1.15-.71-.49.05-.48.05-.48.78.05 1.25.79 1.25.79.69 1.18 1.81.84 2.25.64.07-.5.27-.84.49-1.03-1.74-.2-3.57-.87-3.57-3.87 0-.85.3-1.55.79-2.1-.08-.2-.34-1.02.07-2.13 0 0 .66-.21 2.16.79A7.486 7.486 0 0 1 8 2.835a7.485 7.485 0 0 1 1.97.27c1.5-1 2.16-.79 2.16-.79.41 1.11.15 1.93.07 2.13.49.55.79 1.25.79 2.1 0 3.01-1.83 3.67-3.57 3.87.28.24.52.71.52 1.43 0 1.03-.01 1.87-.01 2.12 0 .22.15.46.55.39C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z"></path>
            </svg>
        </a>
    </li>
    <li class="icon linkedin">
    <a href="https://www.linkedin.com/in/omar-villadiego-8258052bb/" target="_blank">
        <span class="tooltip">LinkedIn</span>
        <svg viewBox="0 0 16 16" height="1.2em" fill="currentColor">
            <path d="M1.5 0A1.5 1.5 0 000 1.5v13A1.5 1.5 0 001.5 16h13A1.5 1.5 0 0016 14.5v-13A1.5 1.5 0 0014.5 0h-13zM4 14H2.5V6H4v8zm-0.75-9.22a1.5 1.5 0 11-0.001-3.001A1.5 1.5 0 013.25 4.78zM14 14h-1.5v-4.5c0-1.125-.024-2.5-1.5-2.5-1.5 0-1.75 1-1.75 2.25V14H8.5V6h1.5v1.25c.5-.75 1.5-1.25 2.75-1.25 1.75 0 3 1 3 4.5V14z"></path>
        </svg>
    </a>
</li>

<li class="icon dailydev">
<a href="https://app.daily.dev/omaryesithvilladiego" target="_blank">
    <span class="tooltip">Daily.dev</span>
    <svg viewBox="0 0 24 24" height="1.2em" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22c-5.52 0-10-4.48-10-10S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm5.77-15.64c-.34.34-.7.64-1.1.92l-.04.02c-.05.03-.09.07-.14.1-.29.23-.64.45-1.07.63-.31.14-.67.24-1.05.24-.75 0-1.37-.23-1.89-.68-.43-.37-.75-.89-.88-1.48-.09-.49-.05-.97.12-1.43.18-.59.48-1.07.91-1.49.4-.39.83-.69 1.29-.89.5-.2 1.02-.32 1.56-.32.45 0 .89.06 1.33.16.48.1.9.3 1.25.56l.07.07.06-.07c.29-.3.66-.54 1.09-.68.43-.13.88-.18 1.34-.18.63 0 1.24.1 1.82.32.56.22 1.04.55 1.43 1.03.45.55.71 1.25.71 2.04 0 1.43-.65 2.62-1.73 3.45zm-1.09 5.19c-.4-.39-.75-.76-1.06-1.15-.26-.34-.52-.67-.77-1.03-.21-.29-.35-.59-.43-.88-.12-.36-.15-.74-.1-1.1.06-.31.19-.63.42-.89.18-.22.44-.39.73-.46.35-.08.65-.06.93.07.23.11.4.3.5.54.07.15.1.33.07.51-.04.18-.13.34-.26.46-.15.15-.36.23-.58.23-.25 0-.48-.1-.67-.29-.15-.15-.27-.34-.34-.54-.07-.18-.07-.37 0-.55.06-.18.17-.35.31-.49.17-.17.39-.28.65-.28.26 0 .51.11.69.29.19.18.31.43.35.7.02.16.02.32-.01.48-.03.18-.1.35-.19.52-.08.14-.17.27-.29.38-.36.36-.82.57-1.3.57-.52 0-1-.21-1.37-.58z"></path>
    </svg>
</a>
</li>

    </ul>
</div>
</body>
</html>`;
