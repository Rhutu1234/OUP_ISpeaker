//////////////////////////////////////////////////////////////////
// Developed By: Mitr Learning & Media							//
// Name: AudioPlayer										//
// Description: All required audio styles are defined here.			 		//
// Date Created: 07/05/2014										//
// Date Modified: 07/05/2014									//
// Version: 1.0:												//
//////////////////////////////////////////////////////////////////

//================================================================================
var AudioPlayerClass = function()
{
    // Default starts ...
    var p =
            {


            }
    // Default ends ...
    var _thisObj = this;
    var audioContext;
    var audioObj = new Object();
	var volume = 1;
    var contextBool = false;
    //--------------
	try
	{
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		audioContext = new AudioContext();
	}
	catch (e)
	{
		contextBool = true;
	}
    //--------------
    if (contextBool)
    {
        for (var i in p)
        {
            audioObj[i] = new Audio();
            audioObj[i].src = p[i].source;
			//controlObj.audio_loaded_log();
        }
    }
    //--------------
    if (audioContext)
    {
        for (var i in p)
        {
           loadAudio(i, true);
        }
    }
    //================================================================================
    // PUBLIC FUNCTIONS
    //================================================================================
    this.add = function(_type, _path, _cback, _ref)
    {
        if (_type.toLowerCase() != "click")
        {
            if (!audioContext)
            {
                audioObj[_type] = new Audio();
				audioObj[_type].oncanplaythrough = _ref;
                audioObj[_type].src = _path;
                if (typeof (_cback) != undefined)
                {
                    audioObj[_type].onended = _cback;
                }
				//audioObj[_type].play();
				//controlObj.audio_loaded_log();
            }
            else
            {
                p[_type] = {source: _path};
                typeof (_cback) != undefined ? p[_type].callBack = _cback : null;
                loadAudio(_type, true, _ref);
				//typeof(_ref) != "undefined" ? setTimeout(function(){_ref()}, 100) : null;
            }
        }
    }
    //================================================================================
	this.setVolume = function(_vol)
	{
		volume = _vol;
	}
    //================================================================================
    this.stop = function(_type)
    {
        if (audioContext)
        {
            if (p[_type] && p[_type].context)
            {
                try
                {
                    p[_type].context.onended = null;
                    p[_type].context.stop(0);
                }
                catch (e) {
                }
            }
        }
        else
        {
            audioObj[_type].onended = null;
            audioObj[_type] ? audioObj[_type].pause() : null;
        }
    }
    //================================================================================
	this.stopAll = function()
	{
		if (audioContext)
		{
			for (var i in p)
			{
			   _thisObj.stop(i);
			}
		} 
	}
    //================================================================================
    this.playAudio = function(_type, _cb, _loop, _volume)
    {
        if (typeof (_cb) != "undefined") {
            if (!audioContext)
            {
                audioObj[_type].onended = _cb;
            }
			else
			{
				p[_type].callBack = _cb;
			}
        }
		//-------
		if(_loop)
		{
			if (!audioContext)
            {
                audioObj[_type].loop = true;
            }
			else
			{
				p[_type].loop = true;
			}
		}
		else
		{
			if (!audioContext)
            {
                audioObj[_type].loop = false;
            }
			else
			{
				p[_type].loop = false;
			}
		}
		//-------
		if(typeof(_volume) != "undefined")
		{
			if (!audioContext)
            {
                audioObj[_type].volume = _volume;
            }
			else
			{
				p[_type].volume = _volume;
			}
		}
		else
		{
			if (!audioContext)
            {
                audioObj[_type].volume = 1;
            }
			else
			{
				p[_type].volume = 1;
			}
		}
		//-------
		if (!audioContext)
		{
			if (audioObj[_type])
			{
				if (audioObj[_type].currentTime)
				{
					audioObj[_type].currentTime = 0.01;
				}
				audioObj[_type].play();
			}
		}
		else
		{
			if (p[_type])
			{
				if (!p[_type].buffer)
				{
					loadAudio(_type);
				}
				else
				{
					playAfterLoad(_type)
				}
			}
		}
    }
    //================================================================================
    // PRIVATE FUNCTIONS
    //================================================================================
    function onError()
    {

    }
    //================================================================================
    function loadAudio(_type, _bool, _ref)
    {
        var request = new XMLHttpRequest();
        request.open('GET', p[_type].source, true);
        request.responseType = 'arraybuffer';
        // Decode asynchronously
        request.onload = function()
        {
            audioContext.decodeAudioData(request.response, function(buffer) {
                p[_type].buffer = buffer;
                playAfterLoad(_type, _bool);
            }, onError);
            //to inform controller audio is loaded
            //controlObj.audio_loaded_log();
			typeof(_ref) != "undefined" ? _ref() : null;
        }
        request.send();
    }
    //================================================================================
    function playAfterLoad(_type, _bool)
    {
        p[_type].context = audioContext.createBufferSource();
		p[_type].gainNode = audioContext.createGain();
        p[_type].context.buffer = p[_type].buffer;
        p[_type].context.connect(p[_type].gainNode);
        p[_type].gainNode.connect(audioContext.destination);
		p[_type].gainNode.gain.value = volume;//p[_type].volume;
        p[_type].context.loop = p[_type].loop;
        typeof (p[_type].callBack) != undefined ? p[_type].context.onended = p[_type].callBack : null;
        _bool ? null : p[_type].context.start(0);
    }
}
//================================================================================
//================================================================================
//================================================================================
//================================================================================
var AudioPlayerNormalClass = function()
{
    // Default starts ...
    var p =
            {


            }
    // Default ends ...
    var _thisObj = this;
    var audioObj = new Audio();
    //================================================================================
    // PUBLIC FUNCTIONS
    //================================================================================
    this.stop = function()
    {
		audioObj ? audioObj.pause() : null;
    }
    //================================================================================
    this.playAudio = function(_path, _cb, _loop, _volume)
    {
        if (typeof (_cb) != "undefined") {
                audioObj.addEventListener("ended", _cb);
        }
		//-------
		if(_loop)
		{
                audioObj.loop = true;
		}
		else
		{
                audioObj.loop = false;
		}
		//-------
		if(typeof(_volume) != "undefined")
		{
                audioObj.volume = _volume;
		}
		else
		{
                audioObj.volume = 1;
		}
		//-------
		audioObj.src = _path;
		audioObj.play();
    }
    //================================================================================
    // PRIVATE FUNCTIONS
    //================================================================================
    function onError()
    {

    }
}

