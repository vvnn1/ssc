package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.entity.request.PSpaceRequest;
import com.github.martvey.cli.entity.request.USpaceRequest;
import com.github.martvey.cli.entity.space.SpaceTable;
import com.github.martvey.cli.net.SpaceApi;
import com.github.martvey.cli.service.SpaceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SpaceServiceImpl implements SpaceService {
    private final SpaceApi spaceApi;

    @Override
    public List<SpaceTable> listSpace() {
        return spaceApi.listSpace();
    }

    @Override
    public void createSpace(String spaceName) {
        spaceApi.createSpace(PSpaceRequest.of(spaceName));
    }

    @Override
    public void dropSpace(String spaceId) {
        spaceApi.deleteSpace(spaceId);
    }

    @Override
    public void renameSpace(String id, String spaceName) {
        spaceApi.renameSpace(new USpaceRequest(id, spaceName));
    }
}
