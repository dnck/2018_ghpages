<script>
var disqus_config = function ()
                      {
                        this.page.url = '{{site.url}}{{page.url}}';
                        this.page.identifier = '{{page.url}}';
                      };
                    (
                    function()
                        {
                          var d = document,
                          s = d.createElement('script');
                          s.src = 'https://dcook.disqus.com/embed.js';
                          s.setAttribute('data-timestamp',+new Date());
                          (d.head || d.body).appendChild(s);
                        }
                    )
                      ();
</script>
<noscript>Please enable JavaScript to view the <a href='https://disqus.com/?ref_noscript'>comments powered by Disqus.</a></noscript>
<script id='dsq-count-scr' src='//dcook.disqus.com/count.js' async></script>
