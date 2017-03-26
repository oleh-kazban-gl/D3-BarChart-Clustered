(function(d3) {
    'use strict';

    var data = [{
        name: 'Alkhjslkjdhfg',
        amount: 4578,
        percentage: 95
    }, {
        name: 'sdfdsfsf',
        amount: 12300,
        percentage: 12
    }, {
        name: 'sdfsdvgfrgv',
        amount: 34534,
        percentage: 23
    }, {
        name: 'regtreg',
        amount: 45645,
        percentage: 34
    }, {
        name: 'asdfsd',
        amount: 4565,
        percentage: 45
    }, {
        name: 'rthth',
        amount: 28978,
        percentage: 56
    }, {
        name: 'retyr',
        amount: 14560,
        percentage: 67
    }, {
        name: 'fgbtgbg',
        amount: 10678,
        percentage: 78
    }, {
        name: 'tyjuyju',
        amount: 9878,
        percentage: 76
    }, {
        name: 'ioolo',
        amount: 16203,
        percentage: 65
    }, {
        name: 'asdasd',
        amount: 33450,
        percentage: 54
    }, {
        name: 'werewre',
        amount: 23543,
        percentage: 33
    }, {
        name: 'fghfghg',
        amount: 24456,
        percentage: 32
    }, {
        name: 'lililil',
        amount: 26756,
        percentage: 21
    }, {
        name: 'yuyjuj',
        amount: 11234,
        percentage: 11
    }, {
        name: 'ik,io,o',
        amount: 6456,
        percentage: 22
    }, {
        name: 'io.loip,.p',
        amount: 36756,
        percentage: 33
    }, {
        name: 'erretret',
        amount: 56876,
        percentage: 44
    }, {
        name: 'fdghdfgdf',
        amount: 37687,
        percentage: 55
    }, {
        name: 'tytyhtyhy',
        amount: 17876,
        percentage: 66
    }];

    var settings = {
        // width: parseInt(d3.select('body').style('width'), 10),
        // height: parseInt(d3.select('body').style('height'), 10),
        width: 900,
        height: 700,
        axisMargin: 20,
        margin: 40,
        barHeight: 0,
        barPadding: 0,
        scale: 0,
        max: d3.max(data, function(d) { return d.amount; }),
        labelWidth: 0,
        percentageWidth: 0,
        amountWidth: 0,
        labelsPadding: 50,
        captionsWidth: function() {
            return this.labelWidth + this.labelsPadding + this.percentageWidth + this.labelsPadding + this.amountWidth;
        }
    };

    settings.barHeight = (settings.height - settings.axisMargin - settings.margin * 2) * 0.4 / data.length;
    settings.barPadding = (settings.height - settings.axisMargin - settings.margin) * 0.6 / data.length;

    var chart = d3.select('body')
        .append('svg')
        .attr('width', settings.width)
        .attr('height', settings.height);

    var bar = chart.selectAll('g')
        .data(data)
        .enter()
        .append('g');

    bar.attr('class', 'bar')
        .attr('cx', 0)
        .attr('transform', function(d, i) {
            return 'translate(' + settings.margin + ', ' + (i * (settings.barHeight + settings.barPadding) + settings.barPadding) + ')';
        });

    bar.append('text')
        .attr('class', 'label')
        .attr('x', 0)
        // .attr('y', 0)
        .text(function(d) { return d.name; })
        .each(function() {
            settings.labelWidth = Math.ceil(Math.max(settings.labelWidth, this.getBBox().width));
        });

    bar.append('text')
        .attr('class', 'percentage')
        .attr('x', settings.labelWidth + settings.percentageWidth + settings.labelsPadding)
        // .attr('y', 100)
        .text(function(d) { return d.percentage + '%'; })
        .each(function() {
            settings.percentageWidth = Math.ceil(Math.max(settings.percentageWidth, this.getBBox().width));
        });

    bar.append('text')
        .attr('class', 'amount')
        .attr('x', settings.labelWidth + settings.percentageWidth + settings.amountWidth + settings.labelsPadding * 2)
        // .attr('y', 200)
        .text(function(d) { return d.amount; }).each(function() {
            settings.amountWidth = Math.ceil(Math.max(settings.amountWidth, this.getBBox().width));
        });

    settings.scale = d3.scaleLinear()
        .domain([0, settings.max])
        .range([0, settings.width - settings.margin * 2 - (settings.labelWidth + settings.percentageWidth + settings.amountWidth + settings.labelsPadding * 2)]);

    bar.append('rect')
        .attr('transform', 'translate(' + settings.captionsWidth() + ', 0)')
        .attr('height', settings.barHeight)
        .attr('width', function(d) {
            return settings.scale(d.amount);
        })
        .attr('x', settings.labelsPadding)
        .attr('y', -settings.barHeight)
        .attr('fill', '#000066');

    bar.append('rect')
        .attr('transform', 'translate(' + settings.captionsWidth() + ', 0)')
        .attr('height', settings.barHeight)
        .attr('width', function(d) {
            return settings.scale(d.amount * (d.percentage / 100));
        })
        .attr('x', settings.labelsPadding)
        .attr('y', -settings.barHeight)
        .attr('fill', '#ff3300');

    console.log('data length: ', data.length);
    console.log('data: ', data);
    console.log('settings: ', settings);

})(window.d3);