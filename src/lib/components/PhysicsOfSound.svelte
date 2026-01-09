<script>
  import { goto } from "$app/navigation";
  import { Align } from "@threlte/extras";
  import Background from "three/src/renderers/common/Background.js";

  let exiting = false;

  async function handlePageTransition(event) {
    event.preventDefault();

    const url = event.currentTarget.getAttribute("href");

    exiting = true;
    await new Promise((r) => setTimeout(r, 500));

    goto(url);
  }
</script>

<section id="physics-of-sound" class="physics-of-sound">
  <div class="page-inner">
    <div class="page-content">
      <div class="section--1">
        <div class="image-wrapper">
          <img
            height="408"
            width="100%"
            loading="lazy"
            src="/images/bg-stars@2x.jpg"
          />
          <div class="container">
            <header class="page-header">
              <h1 class="page-title">Physics Of Sound</h1>
              <div class="sub-title">
                Sound is created by pressure variations that move in waves
                through a medium such as air or water. It is measured in terms
                of frequency and amplitude.
              </div>
            </header>
          </div>
        </div>
      </div>

      <div class="section--2">
        <header class="section-header section-header--gold">
          <div class="container">
            <div class="section-header__inner">
              <div class="section-header__name equal">
                <h2 class="section-header__title">Frequency</h2>
                <div class="section-header__subtitle">
                  Measured in hertz <strong>(Hz)</strong>
                </div>
              </div>
              <div class="section-header__summary equal">
                The number of times per second that a <br />sound pressure wave
                repeats itself.
              </div>
            </div>
          </div>
        </header>
        <div class="container">
          <div class="row">
            <div class="col">
              <figure class="image">
                <img
                  width="350"
                  height="90"
                  loading="lazy"
                  src="/images/drum@2x.png"
                  alt=""
                />
                <figcaption class="image__caption">
                  A drum beat has a lower frequency than a whistle
                </figcaption>
              </figure>
            </div>
            <div class="col">
              <figure class="image">
                <img
                  width="350"
                  height="90"
                  loading="lazy"
                  src="/images/cricket@2x.png"
                  alt=""
                />
                <figcaption class="image__caption">
                  A cricket has a higher frequency than a bullfrog call
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      <div class="section--3">
        <header class="section-header section-header--orange">
          <div class="container">
            <div class="section-header__inner">
              <div class="section-header__name equal">
                <h2 class="section-header__title">AMPLITUDE</h2>
                <div class="section-header__subtitle">
                  Measured in decibels <strong>(dB)</strong>
                </div>
              </div>
              <div class="section-header__summary equal">
                The relative strength of sound waves, <br />which we perceive as
                loudness or volume.
              </div>
            </div>
          </div>
        </header>
        <div class="container">
          <div class="chart" id="chartContainer">
            <canvas
              id="soundChart"
              width="1250"
              height="325"
              style="display: block; width: 1250px; height: 325px;"
              class="chartjs-render-monitor"
            ></canvas>

            <div class="ct-chart"></div>
          </div>
          <div class="sound-effects">
            <div class="sound-effect sound-effect--ear">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-ear.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="65" src=""></audio>
              <div class="sound-effect__title">
                <strong>Threshold of human hearing</strong>
              </div>
            </div>
            <div class="sound-effect sound-effect--volcano">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-volcano.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="83" src="/audio/Uau_HAL.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Volcano <br />crater</strong>
                <em>(Haleakala National Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--leaves">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-leaves.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="68" src="/audio/WindRustlingLeaves.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Leaves <br />rustling</strong>
                <em>(Canyonlands National Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--crickets">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-cricket.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="70" src="/audio/crickets.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Crickets <br />at 5m</strong>
                <em>(Zion National Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--speech">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-lips.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="71" src=""></audio>
              <div class="sound-effect__title">
                <strong>Casual speech <br />at 5m</strong>
                <em>(Whitman Mission National Historic Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--motorcycle">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-motorcycle.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="72" src="/audio/motorcycle.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Motorcycle <br />at 30m</strong>
                <em>(Yellowstone National Park)</em>
              </div>
            </div>
            <div class="sound-effect sound-effect--thunder">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-thunder.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="74" src="/audio/Featured_Thunder.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Thunder</strong> <em>(Arches National Park)</em>
              </div>
              <div class="sound-effect__warning">
                <img src="/icons/Icon_Alert.svg" width="18px">
              </div>
            </div>
            <div class="sound-effect sound-effect--jet">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-jet.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="75" src="/audio/military-jet.mp3"></audio>
              <div class="sound-effect__title">
                <strong>Military jet <br />at 100m AGL</strong>
                <em>(Yukon-Charley Rivers National Park)</em>
              </div>
              <div class="sound-effect__warning">
                <img src="/icons/Icon_Alert.svg" width="18px">
              </div>
            </div>
            <div class="sound-effect sound-effect--cannon">
              <div class="sound-effect__icon">
                <img loading="lazy" src="/icons/icon-cannon.svg" />
              </div>
              <button class="sound-effect__button">
                <span class="play" style="display:flex;align-items:center;"><i class="icon-volume-up"></i>Listen</span>
                <span class="pause"
                  ><i class="icon-pause-circled"></i>Pause</span
                >
              </button>
              <audio id="76" src=""></audio>
              <div class="sound-effect__title">
                <strong>Cannon fire <br />at 150m</strong>
                <em>(Vicksburg National Military Park)</em>
              </div>
              <div class="sound-effect__warning">
                <img src="/icons/Icon_Alert.svg" width="18px">
              </div>
            </div>
          </div>

          <footer class="section-footer">
            <div class="textblock">
              <h3>Click on the icons above to hear the sounds live</h3>
              <p>
                <img src="/icons/Icon_Alert.svg" width="18px" class="s-Qc5YxSxN_7mj"> <small
                  >Sounds above 85dB are considered harmful if exposed for long
                  periods of time. Exercise caution when listening to sound
                  clips with the caution icon.</small
                >
              </p>
            </div>
          </footer>
        </div>
      </div>

      <div
        class="section--4"
        style="background-image: url(/images/bg-aurora@2x.png)"
      >
        <header class="section-header section-header--purple">
          <div class="container">
            <div class="section-header__inner">
              <div class="section-header__name equal">
                <h2 class="section-header__title">Decibels</h2>
              </div>
              <div class="section-header__summary equal">
                <h4>
                  A small change in decibels means a big change in loudness.
                </h4>
                <p>
                  That’s because decibels work on a logarithmic scale. An
                  increase of 10dB represents <br />a ten-fold increase in sound
                  level, which causes perceived loudness to double.
                </p>
              </div>
            </div>
          </div>
        </header>
        <div class="container">
          <table class="table">
            <thead>
              <tr>
                <th>Decibel Level</th>
                <th>Sound Level/Intensity</th>
                <th>Perceived Loudness</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="db-level">20 <span class="thin">dB</span></td>
                <td class="s-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 100
                    <span class="metric">(10<sup>2</sup>)</span>
                  </div>
                </td>
                <td class="p-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 2
                  </div>
                </td>
              </tr>
              <tr>
                <td class="db-level">30 <span class="thin">dB</span></td>
                <td class="s-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 1000
                    <span class="metric">(10<sup>3</sup>)</span>
                  </div>
                </td>
                <td class="p-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 4
                  </div>
                </td>
              </tr>
              <tr>
                <td class="db-level">40 <span class="thin">dB</span></td>
                <td class="s-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 10000
                    <span class="metric">(10<sup>4</sup>)</span>
                  </div>
                </td>
                <td class="p-level">
                  <div>
                    <img
                      loading="lazy"
                      src="/icons/icon-music.svg"
                      width="60"
                      height="60"
                    /> <span class="symbol"><img src="/icons/Icon_x.svg" width="18px"></span> 8
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="textblock">
            <p>
              If 1 vacuum cleaner measures 70dB than 80dB equals 10 vacuum
              cleaners.
            </p>
          </div>

          <div class="bar-charts">
            <div class="bar-chart">
              <div class="bar-chart__label">70 <span>dB</span></div>
              <div class="bar-chart__seperator">=</div>
              <div class="bar-chart__value" style="width: 58px;"></div>
            </div>

            <div class="bar-chart">
              <div class="bar-chart__label">80 <span>dB</span></div>
              <div class="bar-chart__seperator">=</div>
              <div class="bar-chart__value" style="width: 580px;"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="section--5"
        style="background-image: url(/images/bg-car@2x.png)"
      >
        <div class="section-title"><span>How Sounds Travel</span></div>
        <header class="section-header section-header--gold">
          <div class="container">
            <div class="section-header__inner">
              <div class="section-header__name equal">
                <h2 class="section-header__title">Propagation</h2>
              </div>
              <div class="section-header__summary equal">
                How a sound wave travels outward from the <br />source, through
                a medium, like air or water.
              </div>
            </div>
          </div>
        </header>

        <div class="container">
          <div class="callout">
            <div class="callout__title">
              Noise levels in park transportation corridors today are at <strong
                >1000 times the natural level</strong
              >.
            </div>
            <div class="callout__image">
              <img
                width="430"
                height="302"
                loading="lazy"
                src="/images/noise-level@2x.png"
              />
            </div>
            <div class="callout__note">
              <em
                >*For illustrated purposes only and not an accurate
                representation of scale.</em
              >
            </div>
          </div>
          <div class="callout">
            <div class="callout__title">
              Road noise impacts on wildlife have been shown to extend <strong
                >over a mile into the forest</strong
              > (Brumm 2004).
            </div>
            <div class="callout__image">
              <img
                width="430"
                height="275"
                loading="lazy"
                src="/images/road-noise@2x.png"
              />
            </div>
            <div class="callout__note">
              <em
                >*For illustrated purposes only and not an accurate
                representation of scale.</em
              >
            </div>
          </div>
        </div>

        <div class="section--keywords">
          <header class="title-line">
            <div class="container">
              <h2 class="title-line__title">Key Words</h2>
            </div>
          </header>

          <div class="container">
            <div class="row">
              <div class="col">
                <div class="keyword">
                  <div class="keyword__word">ACOUSTIC RESOURCES</div>
                  <div class="keyword__definition">
                    Physical sound sources including natural sounds (wind,
                    water, wildlife, vegetation) and cultural and historic
                    sounds (battle reenactments, tribal ceremonies, etc).
                  </div>
                </div>
                <div class="keyword">
                  <div class="keyword__word">SOUNDSCAPE</div>
                  <div class="keyword__definition">
                    The human, or animal, perception of all combined acoustic
                    resources.
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="keyword">
                  <div class="keyword__word">ACOUSTIC ZONES</div>
                  <div class="keyword__definition">
                    Areas with similar vegetation, terrain, animals, and weather
                    likely have similar acoustic characteristics, including
                    sound sources and sound characteristics. Acoustic zones may
                    be based on existing management zones.
                  </div>

                  <div class="keyword__callout">
                    <img
                      width="180"
                      height="105"
                      loading="lazy"
                      src="/images/zion@2x.png"
                    />
                    <div class="keyword__callout__content">
                      Zion National Park has different <span class="special"
                        >7</span
                      > unique Acoustic Zones
                    </div>
                  </div>
                </div>
              </div>

              <div class="col">
                <div class="keyword">
                  <div class="keyword__word">NOISE FREE INTERVAL</div>
                  <div class="keyword__definition">
                    The period of time between noise events, during which no
                    human-cause sounds are audible.
                  </div>

                  <div class="keyword__callout big">
                    <img
                      width="73"
                      height="85"
                      class="stopwatch"
                      src="/images/stopwatch@2x.png"
                    />
                    <div class="keyword__callout__content">
                      In a transportation<br /> corridor, the noise free<br />
                      interval can be as small as<br /> seconds
                      <span class="special">30</span> during high traffic times!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer class="page-footer">
      <div class="container">
        <div class="hiker">
          <a href="http://hikercompany.com/" target="_blank" rel="noopener">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.883 19.988">
              <defs>
                <style>
                  .cls-1 {
                    fill: #fff;
                  }
                </style>
              </defs>
              <g
                id="Group_35"
                data-name="Group 35"
                transform="translate(0 -0.001)"
              >
                <path
                  id="Path_54"
                  data-name="Path 54"
                  class="cls-1"
                  d="M19.089,11.132c-.035,0-.088.018-.123.018h0a.746.746,0,0,1-.741-.706,1.829,1.829,0,0,1-.018-.547c.018-.176.035-.353.071-.529.035-.282.071-.582.106-.864V8.362c-.053-.282-.653-.335-1.006-.353-.053,0-.123-.018-.159-.018l-.335,1.817A2.607,2.607,0,0,1,15,11.891c-.088.018-.176.018-.265.035a1.35,1.35,0,0,1-1.288-.759c0,.018,0,.018-.018.035a1.566,1.566,0,0,1-1.217,1.217.859.859,0,0,1-.212.018,1.661,1.661,0,0,1-1.394-.9,3.715,3.715,0,0,1-.476-1.041.2.2,0,0,1,.159-.229c.123-.018,1.27-.247,1.588-.759a.477.477,0,0,0,.071-.406c-.035-.176-.141-.229-.388-.176a2.546,2.546,0,0,0-1.5,1.2l-.529,2.629a.227.227,0,0,1-.176.176.231.231,0,0,1-.247-.176.99.99,0,0,1,.035-.176,1.529,1.529,0,0,1-.847.547c-.053,0-.088.018-.141.018a.75.75,0,0,1-.759-.706,2.151,2.151,0,0,1,.035-.812L7.851,9.58c.018-.088.035-.194.053-.282a.247.247,0,0,1,.212-.159.192.192,0,0,1,.194.176c.018.071-.088.582-.476,2.435a1.618,1.618,0,0,0-.035.635.361.361,0,0,0,.335.353H8.2a1.118,1.118,0,0,0,.635-.459,3.072,3.072,0,0,0,.512-.988c.018-.035.018-.071.035-.106a.515.515,0,0,0,.035-.159v-.018c.37-1.852.935-4.569,1.006-4.852a.233.233,0,0,1,.159-.176.207.207,0,0,1,.247.176c0,.053-.123.67-.512,2.576-.053.212-.088.388-.106.512a2.6,2.6,0,0,1,1.253-.706.724.724,0,0,1,.194-.018.617.617,0,0,1,.688.547c.194,1.059-1.235,1.482-1.764,1.623a.627.627,0,0,0,.071.159c.018.018.018.053.035.071.388.847.864,1.217,1.411,1.129.67-.123.847-.759,1.023-1.394.035-.106.053-.212.088-.318,0-.018,0-.035.018-.035a2.87,2.87,0,0,1,.97-2.152,1.516,1.516,0,0,1,.617-.247c.053,0,.088-.018.141-.018a.74.74,0,0,1,.776.582c.159.9-.882,1.764-1.623,1.905a1.442,1.442,0,0,1-.476.018,1.254,1.254,0,0,0,.335.9,1,1,0,0,0,.9.229,1.953,1.953,0,0,0,1.358-1.182,1.841,1.841,0,0,0,.141-.441c.018-.053.018-.088.035-.141V9.738c.018-.053.018-.123.035-.194.088-.406.247-1.164.282-1.57A.665.665,0,0,1,16.2,7.5a.744.744,0,0,1,.053-.388.457.457,0,0,1,.3-.247.6.6,0,0,1,.635.547A.724.724,0,0,1,17.2,7.6c.106.018.229.018.335.035.053,0,.106.018.159.018.353.053.935.123,1.023.653a.753.753,0,0,1,0,.282c-.035.229-.053.459-.088.706-.035.229-.053.476-.088.706a1.56,1.56,0,0,0,0,.406c.035.141.123.406.37.353.406-.071.706-.547.882-1.023A9.826,9.826,0,0,0,9.95,0,9.984,9.984,0,0,0,0,10a10.415,10.415,0,0,0,.335,2.576A16.2,16.2,0,0,1,2.241,11.22c.353-1.694.547-2.646.653-3.158.123-.635.141-.653.141-.688a.23.23,0,0,1,.176-.159.218.218,0,0,1,.247.159,3.925,3.925,0,0,1-.141.759c0,.035-.018.053-.018.071l-.582,2.787c.159-.088.3-.194.441-.282a4.492,4.492,0,0,1,1.694-.847,1.15,1.15,0,0,1,.988.212l.582-3.052c.018-.053.018-.088.035-.141.018-.035.035-.088.053-.123a1.206,1.206,0,0,1,.882-.688c.035,0,.088-.018.141-.018.176,0,.229.088.229.159a.205.205,0,0,1-.035.176.238.238,0,0,1-.159.088H7.445a.791.791,0,0,0-.635.617L6.563,8.468c-.3,1.623-.617,3.281-.935,4.922a.207.207,0,0,1-.176.159.19.19,0,0,1-.229-.159c-.018-.053.123-.759.459-2.54.018-.141.053-.229.053-.282a.244.244,0,0,1-.053-.071.792.792,0,0,0-.741-.212,3.2,3.2,0,0,0-1.164.512c-.088.053-.194.123-.335.212-.282.176-.635.406-.847.529l-.388,1.905a3.3,3.3,0,0,1-.759,1.747,9.941,9.941,0,0,0,18.436-4.64A1.35,1.35,0,0,1,19.089,11.132ZM8.062,8.186a.3.3,0,0,1,.176-.106.261.261,0,0,1,.3.212.29.29,0,0,1-.212.318H8.292a.253.253,0,0,1-.265-.229A.161.161,0,0,1,8.062,8.186Z"
                ></path>
                <path
                  id="Path_55"
                  data-name="Path 55"
                  class="cls-1"
                  d="M4.358,67.1a14.739,14.739,0,0,0-1.464,1.059c-.071.053-.123.106-.194.159A9.4,9.4,0,0,0,3.476,70.1a3.306,3.306,0,0,0,.582-1.482Z"
                  transform="translate(-2.224 -55.262)"
                ></path>
                <path
                  id="Path_56"
                  data-name="Path 56"
                  class="cls-1"
                  d="M79.323,47.322a.519.519,0,0,0-.053-.459.416.416,0,0,0-.441-.123c-.688.141-1.041,1.059-1.129,1.641a1.365,1.365,0,0,0,.37-.018A1.719,1.719,0,0,0,79.323,47.322Z"
                  transform="translate(-63.992 -38.483)"
                ></path>
                <path
                  id="Path_57"
                  data-name="Path 57"
                  class="cls-1"
                  d="M94.464,40.9h0c-.035,0-.035.071-.018.123a.234.234,0,0,0,.159.123v-.035C94.587,41.041,94.516,40.9,94.464,40.9Z"
                  transform="translate(-77.774 -33.684)"
                ></path>
              </g>
            </svg>
            Powered by Hiker
          </a>
        </div>

        <!-- Arrow that navigates to the Physics of Sound page -->
        <a
          href="/spectrogram"
          class="button button-down move-to-next"
          aria-label="Go to Physics of Sound"
          on:click={handlePageTransition}
        >
          <img
            class="footer-arrow-img"
            src="/icons/arrow-down.svg"
            width="22"
            height="11"
            alt=""
          />
        </a>
      </div>
    </footer>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script>
document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("soundChart").getContext("2d");

  // Chart code (unchanged)
  const soundChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Threshold of human hearing",
        "Volcano crater",
        "Leaves rustling",
        "Crickets at 5m",
        "Casual speech at 5m",
        "Motorcycle at 30m",
        "Thunder",
        "Military jet at 100m AGL",
        "Cannon fire at 150m",
      ],
      datasets: [
        {
          data: [0, 20, 30, 45, 60, 85, 110, 130, 140],
          backgroundColor: "rgba(160, 82, 45, 0.95)",
          borderColor: "#FFA500",
          borderWidth: 4,
          pointRadius: 8,
          pointBackgroundColor: "#FFA500",
          pointBorderColor: "#FFA500",
          pointHoverRadius: 10,
          fill: true,
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      scales: {
        y: {
          min: 0,
          max: 150,
          ticks: {
            stepSize: 30,
            color: "#ffffff",
            callback: (value) => value + " dB",
          },
        },
        x: {
          ticks: { display: false },
        },
      },
    },
  });

  // Audio functionality
  const audioButtons = document.querySelectorAll(".sound-effect__button");

  // Function to handle red background
  function setActiveButton(activeButton) {
    audioButtons.forEach((btn) => {
      if (btn === activeButton) {
        btn.style.backgroundColor = "red";
      } else {
        btn.style.backgroundColor = "#FF931E";
      }
    });
  }

  audioButtons.forEach((button) => {
    const playSpan = button.querySelector(".play");
    const pauseSpan = button.querySelector(".pause");
    const soundEffect = button.closest(".sound-effect");
    const audio = soundEffect?.querySelector("audio");

    if (!audio) return;

    pauseSpan.style.display = "none";

    button.addEventListener("click", function () {
      if (audio.paused) {
        // Pause all audios
        document.querySelectorAll("audio").forEach((a) => {
          a.pause();
          a.currentTime = 0;
        });

        // Reset all play/pause spans
        audioButtons.forEach((btn) => {
          btn.querySelector(".play").style.display = "flex";
          btn.querySelector(".pause").style.display = "none";
        });

        // Play current audio
        audio.play();
        playSpan.style.display = "none";
        pauseSpan.style.display = "flex";
        pauseSpan.style.textAlign = "center";

        // Set red using function
        setActiveButton(button);
      } else {
        audio.pause();
        playSpan.style.display = "flex";
        pauseSpan.style.display = "none";
        button.style.backgroundColor = "#FF931E"; // reset
      }
    });

    audio.addEventListener("ended", function () {
      playSpan.style.display = "flex";
      pauseSpan.style.display = "none";
      button.style.backgroundColor = "#FF931E"; // reset
    });
  });

  // Tooltip
  document.querySelectorAll(".sound-effect__warning").forEach((icon) => {
    icon.setAttribute("title", "Warning: Sound above 85dB");
  });
});
</script>


  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <script>
    document.addEventListener("DOMContentLoaded", function () {
      const ctx = document.getElementById("soundChart").getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          datasets: [
            {
              data: [
                { x: 1, y: 0 }, // hidden anchor on x-axis
                { x: 2, y: 20 }, // first visible point (ear)
                { x: 3, y: 30 },
                { x: 4, y: 45 },
                { x: 5, y: 60 },
                { x: 6, y: 85 },
                { x: 7, y: 105 },
                { x: 8, y: 120 },
                { x: 9, y: 130 },
                { x: 10, y: 140 }, // last visible point
              ],
              backgroundColor: "rgba(160, 82, 45, 0.95)",
              borderColor: "#FFA500",
              borderWidth: 4,
              pointRadius: 7,
              pointBackgroundColor: "#FFA500",
              pointBorderColor: "#FFA500",
              fill: true,
              tension: 0.3,
              clip: false, // IMPORTANT
            },
          ],
        },

        options: {
          responsive: false,
          maintainAspectRatio: false,

          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
          },

          scales: {
            y: {
              min: 0,
              max: 150,
              ticks: {
                stepSize: 30,
                color: "#ffffff",
                callback: (v) => v + " dB",
              },
              title: {
                display: true,
                text: "Decibels (dB)",
                color: "#ffffff",
                font: { size: 16, weight: "bold" },
              },
              grid: { display: false },
              border: {
                display: true,
                color: "#ffffff",
                width: 2,
              },
            },

            x: {
              type: "linear",
              min: 0, 
              max: 11, 
              ticks: { display: false },
              grid: { display: false },
              border: {
                display: true,
                color: "#ffffff",
                width: 2,
              },
            },
          },

          animation: {
            duration: 1600,
            easing: "easeOutCubic",
          },
        },
      });
    });
  </script>
</section>

<style>
  .footer-arrow-img {
    display: inline-block;
    margin-left: 13px;
    margin-top: 19px;
  }
  :global(body) {
    opacity: 1;
    transform: translateY(0);
    transition:
      opacity 0.6s ease,
      transform 0.6s ease;
  }

  :global(body.page-exit) {
    opacity: 0;
    transform: translateY(-12px);
  }

  .page-exit {
    animation: fadeUp 0.5s ease forwards;
  }

  @keyframes fadeUp {
    to {
      opacity: 0;
      transform: translateY(-16px);
    }
  }
</style>


