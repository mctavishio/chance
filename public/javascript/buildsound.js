function buildsound( blueprint ) {
	var sound = {};
	//https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-audio-and-midi-api-amplitude-modulation/	
	if( blueprint.role !== "mobile") {

		sound.intervals = {
			lowi: function(basetone){ return Math.floor(basetone/4) },
			i: function(basetone){ return Math.floor(basetone/2) },
			I: function(basetone){ return Math.floor(basetone/1) },
			II: function(basetone){ return Math.floor(basetone*9/8) },
			III: function(basetone){ return Math.floor(basetone*5/4) },
			iii: function(basetone){ return Math.floor(basetone*6/5) },
			IV: function(basetone){ return Math.floor(basetone*4/3) },
			V: function(basetone){ return Math.floor(basetone*3/2) },
			VI: function(basetone){ return Math.floor(basetone*5/3) },
			VII: function(basetone){ return Math.floor(basetone*15/8) },
			vii: function(basetone){ return Math.floor(basetone*9/5) },
			VIII: function(basetone){ return Math.floor(basetone*2) },
		};

		/*
		sound palette ::: https://en.wikipedia.org/wiki/Just_intonation or
		http://www.phy.mtu.edu/~suits/scales.html
		JI
		1/1	9/8	5/4	4/3	3/2	5/3	15/8	2/1 (ptolomy ::: https://en.wikipedia.org/wiki/Ptolemy%27s_intense_diatonic_scale)
		C	D	E	F	G	A	B	C
		JI ::: type 2 (for minor)
		1/1	9/8	6/5	4/3	3/2	8/5	9/5	2/1
		C	D	Eb	F	G	Ab	Bb	C
		Pythagorean Tuning
		1/1	9/8	81/64	4/3	3/2	27/16	243/128	
		C	D	E	F	G	A	B
		in JI ::: 256 = 2^8 (middle C =256)  http://motherboard.vice.com/read/the-fringe-audiophiles-who-want-to-topple-standard-tuning
		in Pyth ::: a = 432
		so ::: 
		*/
		var f = sound.intervals.I(blueprint.rootpitch);
		/*
		sound.freqchoices = [
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.lowi( f ), sound.intervals.i( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.V( sound.intervals.i( f ) ), sound.intervals.II( f ), sound.intervals.V( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.IV( sound.intervals.i( f ) ), sound.intervals.IV( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.IV( f ), sound.intervals.V(f), sound.intervals.V( sound.intervals.i( f ) ) ]},
			{ core: sound.intervals.I( f ), chord: [ sound.intervals.i( f ),  sound.intervals.IV( f ), sound.intervals.V(f)   ]},
			//{ core: sound.intervals.I( f ), chord: [ sound.intervals.i( f ), sound.intervals.IV( f ), sound.intervals.vii(f), sound.intervals.V(f)   ]},
			{ core: sound.intervals.I( f ), chord: [sound.intervals.i( f ), sound.intervals.V( sound.intervals.i( f ) ), sound.intervals.I( f ), sound.intervals.V( f ), sound.intervals.III( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.IV( f ), sound.intervals.V(f), sound.intervals.V( sound.intervals.i( f ) ) ]},
			{ core: sound.intervals.I( f ), chord: [sound.intervals.V( f ), sound.intervals.II( f ), sound.intervals.V( sound.intervals.i( f ) ), sound.intervals.IV( f )] },
			//{ core: sound.intervals.I( f ), chord: [sound.intervals.V( f ), sound.intervals.II( f ), sound.intervals.III( f ), sound.intervals.IV( f )] },
			
			//{ core: sound.intervals.I( f ), chord: [sound.intervals.III( f ), sound.intervals.VII( sound.intervals.i( f ) ), sound.intervals.II( f ), sound.intervals.VI( f )] },

		];
		*/

		sound.freqchoices = [
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.lowi( f ), sound.intervals.i( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.V( sound.intervals.i( f ) ), sound.intervals.V( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.IV( sound.intervals.i( f ) ), sound.intervals.IV( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.IV( f ), sound.intervals.V(f), sound.intervals.V( sound.intervals.i( f ) ) ]},
			{ core: sound.intervals.I( f ), chord: [ sound.intervals.i( f ),  sound.intervals.IV( f ), sound.intervals.V(f)   ]},
			//{ core: sound.intervals.I( f ), chord: [ sound.intervals.i( f ), sound.intervals.IV( f ), sound.intervals.vii(f), sound.intervals.V(f)   ]},
			{ core: sound.intervals.I( f ), chord: [sound.intervals.i( f ), sound.intervals.V( sound.intervals.i( f ) ), sound.intervals.I( f ), sound.intervals.V( f ), sound.intervals.III( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.I( f ), sound.intervals.IV( f ), sound.intervals.V(f), sound.intervals.V( sound.intervals.i( f ) ) ]},
			{ core: sound.intervals.I( f ), chord: [sound.intervals.V( f ), sound.intervals.V( sound.intervals.i( f ) ), sound.intervals.IV( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.V( f ), sound.intervals.V( sound.intervals.i( f ) ), sound.intervals.II( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.V( f ), sound.intervals.III( f )] },

		];
		//old
		/*
		sound.freqchoices = [
			{ core: sound.intervals.I( f ), chord: [sound.intervals.lowi( f ), sound.intervals.i( f ), f, sound.intervals.VIII( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.V( sound.intervals.i( f ) ), f, sound.intervals.V( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.IV( sound.intervals.i( f ) ), sound.intervals.IV( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.i( f ), sound.intervals.IV( f ), sound.intervals.V( f ) ]},
			{ core: sound.intervals.I( f ), chord: [ sound.intervals.i( f ), sound.intervals.I( f ), sound.intervals.vii(f), sound.intervals.V(f)   ]},
			{ core: sound.intervals.I( f ), chord: [ sound.intervals.i( f ), sound.intervals.I( f ), sound.intervals.IV( f ), sound.intervals.V(f)   ]},
			{ core: sound.intervals.I( f ), chord: [ sound.intervals.i( f ), sound.intervals.I( f ), sound.intervals.IV( f ), sound.intervals.vii(f), sound.intervals.V(f)   ]},
			{ core: sound.intervals.I( f ), chord: [sound.intervals.i( f ), sound.intervals.V( sound.intervals.I( f ) ), sound.intervals.III( f )] },
			{ core: sound.intervals.I( f ), chord: [sound.intervals.i( f ), sound.intervals.VI( f )] },
		];
		*/
		
		sound.corefreq = sound.freqchoices[0].core;
		sound.chord = sound.freqchoices[0].chord;
		sound.c4 =256; //middle C
		/* set up player*/
		sound.player = {};
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		sound.player.context = new AudioContext();

		/* experimental parameters */
		var parameters = [
			{ gain: 0.4, threshold: -24, knee: 30, ratio: 12, attack: 0.003, release: 0.25 }, //default
			{ gain: 0.3, threshold: -18, knee: 30, ratio: 18, attack: 0.0003, release: 0.28 },
			{ gain: 0.5, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
			{ gain: 0.6, threshold: -8, knee: 30, ratio: 18, attack: 0.003, release: 0.28 },
		];
		var n = 3;
		sound.player.gain = sound.player.context.createGain();
		sound.player.gain.gain.value = blueprint.gain ? blueprint.gain : parameters[n].gain;
		//https://webaudio.github.io/web-audio-api/#idl-def-DynamicsCompressorNode
		sound.player.compressor = sound.player.context.createDynamicsCompressor();
		sound.player.compressor.threshold.value = parameters[n].threshold; // [-100,0] ::: default -24
		sound.player.compressor.knee.value = parameters[n].knee; // [0,40] ::: default 30
		sound.player.compressor.ratio.value = parameters[n].ratio; // [1,20] ::: default 12
		//sound.player.compressor.reduction.value = -20;
		sound.player.compressor.attack.value = parameters[n].attack;  // [0,1] ::: default .003
		sound.player.compressor.release.value = parameters[n].release;  // [0,1] ::: default .25
		//with compressor
		//sound.player.gain.connect(sound.player.compressor);
		//sound.player.compressor.connect(sound.player.context.destination);

		//with no compressor
		sound.player.gain.connect(sound.player.context.destination);

		/* utility functions */
		sound.playdrawings = function() { blueprint.sound.playnote( { frequency: blueprint.sound.chord[ blueprint.tools.randominteger(0, blueprint.sound.chord.length) ] , volume: 0.03, duration: 1.8, fadetime: 0.4, delay: blueprint.tools.randominteger(0, 10) / 10.0 } ); };
		sound.playcorefreq = function() { blueprint.sound.playnote( { frequency: blueprint.sound.corefreq * [0.5,1,2][blueprint.tools.randominteger(0,2)] + blueprint.tools.randominteger(-2, 2), volume: 0.05, duration: 2.0, fadetime: 0.4, delay: 0 } ) };
		//begin: function() { blueprint.io.sound.playnote( { frequency: blueprint.constants.intervals.VIII( blueprint.palette.corefreq ) + blueprint.tools.randominteger(-2, 2), volume: 0.04, duration: 1.0, fadetime: 0.6, delay: 0 } ) },

		sound.playnote = function(e) {
			[[e.frequency-2, 0.005], [e.frequency, 0.3], [e.frequency+2, 0.005]].forEach(function(f,j,array) {
				var vco = blueprint.sound.player.context.createOscillator();
				vco.frequency.value = f[0];
				vco.type = "sine";
				var pannode = blueprint.sound.player.context.createStereoPanner();
				pannode.pan.value = 1 - Math.random()*2;
				vco.connect(pannode);
				var vca = blueprint.sound.player.context.createGain(); 
				pannode.connect(vca);
				
				vca.connect(blueprint.sound.player.gain);
				var currenttime = blueprint.sound.player.context.currentTime;
				//fade in
				vca.gain.linearRampToValueAtTime(0.001, currenttime + e.delay);
				vca.gain.linearRampToValueAtTime(e.volume*f[1], currenttime + e.fadetime + e.delay);
				//fade out
				vca.gain.linearRampToValueAtTime(e.volume*f[1], currenttime + e.duration + e.delay - e.fadetime);
				vca.gain.linearRampToValueAtTime(0.001, currenttime + e.duration + e.delay);
				vco.start(currenttime + e.delay);
				vco.stop(currenttime + e.delay + e.duration + e.fadetime);
			});
		};
	}
	else {
		sound.playnote = function(e) {};
	}
	return sound;
}