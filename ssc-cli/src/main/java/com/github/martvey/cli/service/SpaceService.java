package com.github.martvey.cli.service;

import com.github.martvey.cli.entity.space.SpaceTable;

import java.util.List;

public interface SpaceService {
    List<SpaceTable> listSpace();
    void createSpace(String spaceName);
    void dropSpace(String spaceId);
    void renameSpace(String id, String spaceName);
}
