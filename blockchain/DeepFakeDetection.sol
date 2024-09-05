// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeepFakeDetection {

    struct Video {
        string videoHash;        // The cryptographic hash (unique identifier) of the video
        string uploader;         // The name or identifier of the uploader
        uint256 timestamp;       // The timestamp when the video was uploaded
        bool isDeepfake;         // Indicates whether the video is marked as a deepfake or not
    }

    mapping(string => Video) public videos;    // Maps video hashes to the Video struct
    address public owner;                      // Owner of the contract (for administrative purposes)

    event VideoUploaded(string videoHash, string uploader, uint256 timestamp, bool isDeepfake);
    event VideoVerified(string videoHash, bool isAuthentic);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;    // Set the contract deployer as the owner
    }

    // Function to upload and register a new video on the blockchain
    function uploadVideo(string memory _videoHash, string memory _uploader, bool _isDeepfake) public {
        require(bytes(videos[_videoHash].videoHash).length == 0, "Video already registered");

        videos[_videoHash] = Video({
            videoHash: _videoHash,
            uploader: _uploader,
            timestamp: block.timestamp,
            isDeepfake: _isDeepfake
        });

        emit VideoUploaded(_videoHash, _uploader, block.timestamp, _isDeepfake);
    }

    // Function to verify if the uploaded video is authentic or tampered
    function verifyVideo(string memory _videoHash) public view returns (bool) {
        Video memory video = videos[_videoHash];
        require(bytes(video.videoHash).length != 0, "Video not found");

        // If the video is not marked as deepfake, it is considered authentic
        bool isAuthentic = !video.isDeepfake;

        return isAuthentic;
    }

    // Function to allow the owner to mark a video as deepfake
    function markAsDeepfake(string memory _videoHash) public onlyOwner {
        require(bytes(videos[_videoHash].videoHash).length != 0, "Video not found");

        videos[_videoHash].isDeepfake = true;
    }

    // Function to get the video details (hash, uploader, timestamp, and status)
    function getVideoDetails(string memory _videoHash) public view returns (string memory, string memory, uint256, bool) {
        Video memory video = videos[_videoHash];
        require(bytes(video.videoHash).length != 0, "Video not found");

        return (video.videoHash, video.uploader, video.timestamp, video.isDeepfake);
    }
}
