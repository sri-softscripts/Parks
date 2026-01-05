   <div class="page-inner">
          <div class="page-content">
            <div class="spectrogram-tips" id="spectrogram-section-1-tips">
              <div class="spectrogram-tips__item">
                <a href="#" class="close-tip">Close</a>
                <div class="spectrogram-tips__item-img">
                  <img
                    loading="lazy"
                    src="src/lib/assets/icons/flying-bird.png"
                    alt="flying-bird"
                  />
                </div>
                <div class="spectrogram-tips__item-text">
                  Listen carefully to see if you can hear the eagle crying.
                </div>
              </div>
              <div class="spectrogram-tips__item">
                <a href="#" class="close-tip">Close</a>
                <div class="spectrogram-tips__item-img">
                  <img
                    loading="lazy"
                    src="/src/lib/assets/images/lizard.png"
                    alt="lizard"
                  />
                </div>
                <div class="spectrogram-tips__item-text">
                  Did you hear the lizard? If you missed it, listen to the clip
                  below and see if you can hear it again.<br /><br /><a
                    href="#trigger-forest"
                    class="listen-tip">Listen</a
                  >
                </div>
              </div>
            </div>
            <div class="spectrogram-tips" id="spectrogram-section-3-tips">
              <div class="spectrogram-tips__item">
                <a href="#" class="close-tip">Close</a>
                <div class="spectrogram-tips__item-img">
                  <img
                    loading="lazy"
                    src="/src/lib/assets/images/coyote.png"
                    alt="coyote"
                  />
                </div>
                <div class="spectrogram-tips__item-text">
                  Can you still hear the coyote howling when one of the noises
                  are clicked?
                </div>
              </div>
            </div>
            <div class="section--1">
              <div class="container">
                <header class="page-header">
                  <h1 class="page-title">Spectrogram</h1>
                  <div class="sub-title">
                    A spectrogram is a graphical representation of acoustic
                    measurements. Acoustic spectrograms have three axes: <strong
                      >time, frequency, and intensity</strong
                    >.
                  </div>
                </header>
              </div>
            </div>
            <div class="spectrogram-section" id="spectrogram-section-1">
              <div class="container">
                <div class="spectrogram-header">
                  <h2 class="base color-green">Natural Ambient</h2>
                  <div class="sub-title">
                    Composed of the natural sound conditions in a park that
                    exist in the absence of any human-made noise (e.g.
                    mechanical, electrical, and other non-natural sounds).
                  </div>
                </div>
                <div class="spectrogram-action">
                  <div class="spectrogram-container">
                    <h3>Choose an environment</h3>
                    <div class="spectrogram-buttons">
                      <div
                        data-name="Forest"
                        data-src="src/lib/assets/audio/crickets.mp3"
                        id="trigger-forest"
                        class="spectrogram-button"
                      >
                        <div class="spectrogram-button-icon">
                          <img
                            loading="lazy"
                            src="src/lib/assets/icons/icon-forest.svg"
                            alt=""
                          />
                        </div>
                        <div class="spectrogram-button-text">Forest</div>
                      </div>
                      <div
                        data-name="Desert"
                        data-src="/web/20250815031604oe_/http://parks.hikercompany.com/assets/sounds/spectrogram/Coyote.mp3"
                        class="spectrogram-button"
                      >
                        <div class="spectrogram-button-icon">
                          <img
                            loading="lazy"
                            src="src/lib/assets/icons/icon-desert.svg"
                            alt=""
                          />
                        </div>
                        <div class="spectrogram-button-text">Desert</div>
                      </div>
                      <div
                        data-name="Lake"
                        data-src="/web/20250815031604oe_/http://parks.hikercompany.com/assets/sounds/spectrogram/Alligator.mp3"
                        class="spectrogram-button"
                      >
                        <div class="spectrogram-button-icon">
                          <img
                            loading="lazy"
                            src="src/lib/assets/icons/icon-lake.svg"
                            alt=""
                          />
                        </div>
                        <div class="spectrogram-button-text">Lake</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="spectrogram-set">
                  <canvas id="spectrogramcanvas"></canvas>
                  <canvas id="legend"></canvas>
                  <div id="loadingSound" class="music-box__modal">
                    <div class="music-box__modal__message">
                      <div
                        id="loadingMessage"
                        class="music-box__modal__message__text"
                      >
                        Flute
                      </div>
                      <svg
                        class="spinner"
                        width="55px"
                        height="55px"
                        viewBox="0 0 66 66"
                        xmlns="http://www.w3.org/2000/svg"
                        ><circle
                          class="circle"
                          fill="none"
                          stroke-width="3"
                          stroke-linecap="round"
                          cx="33"
                          cy="33"
                          r="30"
                        ></circle></svg
                      >
                    </div>
                  </div>
                </div>
                <div class="pagnation-blk">
                  <button
                    type="button"
                    name="button"
                    data-parent="spectrogram"
                    data-target="spectrogram-noise"
                    class="button move-to-next-names"
                  >
                    <i class="fa fa-angle-down" aria-hidden="true"></i>
                    <span>Next: Noise</span></button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>