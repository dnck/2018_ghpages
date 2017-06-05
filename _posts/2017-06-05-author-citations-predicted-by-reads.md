<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
	<div class="row">
    	<div class="row-md-4" style="background-color:white;">
			<h1>Visualizing Citations Predicted by Reads</h1>
				<p><b>Core javscript library = plot.ly, open source, <a href="https://plot.ly/javascript/open-source-announcement/">MIT License</a> </b> </p>

				<p>In this tutorial, I show you how I created the plot you see on the right (on fullscreens) or on the bottom of the monitor (small screens). The goal is to show you how to create two distributions of data and then how to plot the correlation for these two distributions. This may sound simple, but someone out there might find it useful as a beginner. </p> <p> </p> <p> <h2>What do the numbers mean </h2> <b> Short Version: Basically, each data point represents a science paper and 1) how many times it was read and 2) how many authors have cited the paper in their work. </b> <br> <br> <p> Here's the long verison. If you're like me, you like to know what numbers mean before you plot them. In this example, I plot imaginary data that approximately resembles the summary statistics maintained by ScienceOpen.com for authors listed on their website. In the ScienceOpen database, it appears that the string corresponding to an author's published name is a key to different pages of the ScienceOpen website. Besides hosting author pages (for free), almost all of the pages on the ScienceOpen website are articles published by Science Journals or by Academic Arts and Humanities Journals. Irrespective of their discipline, some articles on ScienceOpen seem to be considered way more often by both readers and other authors. You can see an example of an author's summary statistics on ScienceOpen.com <a href ="https://www.scienceopen.com/search#author/ea42759d-c9a9-4bb0-8437-fa41d099df45">here</a>. Notice that a single paper can have both a read-count and a cited-by count. A high read-count means that a lot of people have read (or opened the page to) the paper, and a single cited-by count implies that many authors have considered the article in their own work. There's a lot to say about ScienceOpen.com, but I just wanted to provide background for my numbers. If you're interested in knowing more about ScienceOpen, we could talk about it later. </p> <h2> How do I get the numbers </h2> <p> ScienceOpen does not host any statistics for download. Typically, if a site doesn't do that, I'd just scrap it. But ScienceOpen is dyanmically generating their html documents, so scrappers beware! </p> <br> <p> Instead of scraping ScienceOpen, I randomly generated two log distributions to mimic the "read count" and the "cited by count" for an author's papers. I did that in my mac terminal with python and its numpy package: 
				</p> <p> 
				<code> <br>
				Users/name/desktop/ > python <br>Users/name/desktop/ > import numpy as np <br>Users/name/desktop/ > read_count = [int(np.random.lognormal(mean=4)) for i in range(140)] 
				<br>Users/name/desktop/ > citation_count = [int(np.random.lognormal(mean=4)) for i in range(140)] <br>
				</code>
				</p> <p> 
				From there, you can pretty much copy and paste the variable read_count and citation_count into an excel sheet, which I did <a href ='https://raw.githubusercontent.com/dnck/learn_to_code/master/test.csv'>here</a>. 
				<h2>Why did you use a lognormal distribution?</h2>
				<p> <b>TL;DR: When I analyzed similar summary stats maintained by Google Scholar for researchers, the distributions for these stats appeared to come from a log-normal distribtion. </b><br> <p> So log normal distributions are called "log normal" because they can be mathematically transformed into a gaussian distribution e.g. normally bell curved distribution, by iteratively applying a log function to each data point in the distribution. One property of a lognormal distribution (when it's not transformed into a gaussian) is that a lot of the numbers bunch up toward one tail of the distribution, which is what I needed to simulate a situation in which many of an author's papers were read just a few times, but a few were read / cited very often. <br> </p><p>The numpy function np.random.lognormal() takes three parameters: 1) the underlying mean of a normal distribution, 2) the standard deviation of the underlying normal distribution, and 3) the array shape. Unless you want to do some some multivariate stuff, you can ignore the shape parameter. For now, you just need to know I used a mean of 4. I selected the mean empirically, looking at the resulting mean of the log distribution until I got something that roughly resemebled a known author on ScienceOpen. So that's the long explanation for my use of a log-normal distribution. It's not totally accurate, but it allowed me to simulate the data I wanted to model.</p>
				<h2>About the plot</h2>
				<p>
				The position and size for each data point is controlled by a single paper's read count and its position along the y-axis is controlled by how many times the paper was cited by other papers in the database. If you hover your mouse above a point, it will show you the exact stats and the title for the data point, i.e. it could give the citation for the point. You can download the imaginary data that I used for the plot <a href ='https://raw.githubusercontent.com/dnck/learn_to_code/master/test.csv'>here</a>. Try to zoom, scale, and pan on the plot. Also try out the last button on the toolbar, "compare on hoover". It is my favorite. </p>
		</div>
		<div class="col-md-8" style="background-color:white;">
			<div id="tester"></div>
			<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
			<script>
			Plotly.d3.csv('https://raw.githubusercontent.com/dnck/learn_to_code/master/test.csv', 
					
					function(err, rows){

						var YEAR = 2016;
						var discipline = ['Discipline A', 'Discipline B', 'Discipline C', 'Discipline D', 'Discipline E'];
						var POP_TO_PX_SIZE = 0.25;
					

						function unpack(rows, key) {
				  			return rows.map(function(row)
				  				{return row[key];});}
						
						var data = discipline.map(function(discipline) {
				  		var rowsFiltered = rows.filter(function(row) {
				      		return (row.discipline === discipline) && (+row.year === YEAR);});
				  				return {
								      mode: 'markers',
								      name: discipline,
								      x: unpack(rowsFiltered, 'readCount'),  
								      y: unpack(rowsFiltered, 'citedBy'),
								      text: unpack(rowsFiltered, 'contentTitle'),
								      marker: {sizemode: 'area',size: unpack(rowsFiltered, 'readCount'),sizeref: POP_TO_PX_SIZE}, 
								  };});

						var layout = {
						  title: 'Cited-by Count ~ Read Count',
						  xaxis: {title: 'Read Count'},
						  yaxis: {title: 'Cited by Count Total'},
						  margin: {t: 50},
						  autosize: true,
						  hovermode: 'closest',

						};

					Plotly.plot('tester', data, layout, {showLink: false});
				});
			</script>
		</div>



