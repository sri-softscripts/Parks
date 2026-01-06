<script lang="ts">
  import { learnMoreData } from '$lib/data/learnmore';
</script>

<section id="learn-more" class="">
  <div class="page-inner">
    <div class="page-content">
      <div class="img-blk">
        {#each learnMoreData.heroImages as image}
          <img
            width={image.width}
            height={image.height}
            class="hero"
            src={image.src}
            alt={image.alt}
          />
        {/each}
      </div>
      <div class="content">
        {#each learnMoreData.contentSections as section}
          <div class="content-wrap">
            <h2 class="line">{section.title}</h2>
            {#each section.paragraphs as paragraph}
              <p>{@html paragraph}</p>
            {/each}
          </div>
        {/each}
        
        <div class="content-wrap">
          <h2 class="line">PUBLICATIONS</h2>
          <div class="references">
            {#each learnMoreData.publications as pub}
              <div class="reference">
                <div class="reference__content">
                  <h2 class="reference__title">
                    <strong>{pub.authors} ({pub.year}).</strong>
                  </h2>
                  <p>
                    <em>
                      {pub.title}
                      {#if pub.journal}
                        {pub.journal.startsWith('Doctoral dissertation') ? `. ${pub.journal}` : `. ${pub.journal}`}
                      {/if}
                      {#if pub.volume && !pub.journal?.startsWith('Doctoral dissertation')}
                        , {pub.volume}
                      {/if}
                      {#if pub.issue}
                        ({pub.issue})
                      {/if}
                      {#if pub.pages}
                        , {pub.pages}
                      {/if}
                      .
                    </em>
                  </p>
                </div>
                {#if pub.doi}
                  <a href={pub.doi} target="_blank" rel="noopener noreferrer">{pub.doi}</a>
                {:else if pub.pdfUrl}
                  <a href={pub.pdfUrl} target="_blank" rel="noopener noreferrer"></a>
                {/if}
              </div>
            {/each}
          </div>
        </div>
        
        <p>{learnMoreData.downloadText}</p>
        <a
          href={learnMoreData.bibliographyPdfUrl}
          target="_blank"
          class="button button-gold-orange"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
      </div>
    </div>
  </div>
</section>
