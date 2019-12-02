# video-player

This application serves video .mp4 format.

http://localhost:5000/video 

The idea is to not serve whole file in one chunk.

https://github.com/MariiaZimokha/video-player/blob/master/routes.js#L24

[**Range**](https://github.com/MariiaZimokha/video-player/blob/master/routes.js#L26) HTTP request header indicates the part of a document that the server should return. Several parts can be requested with one Range header at once, and the server may send back these ranges in a multipart document.
- If the server sends back ranges, it uses the 206 Partial Content for the response. 
- If the ranges are invalid, the server returns the 416 Range Not Satisfiable error. 
- The server can also ignore the Range header and return the whole document with a 200 status code.


![how calls look like](/assets/video-endpoint-calls.png?raw=true)
