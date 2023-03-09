package com.github.martvey.cli.service.impl;

import com.github.martvey.cli.constant.GraphFlowEnum;
import com.github.martvey.cli.entity.graph.EasyGraphOperator;
import com.github.martvey.cli.entity.job.JobTable;
import com.github.martvey.cli.entity.job.PJobRequest;
import com.github.martvey.cli.entity.plan.Input;
import com.github.martvey.cli.entity.plan.Node;
import com.github.martvey.cli.entity.plan.Plan;
import com.github.martvey.cli.entity.request.USqlJobRequest;
import com.github.martvey.cli.net.JobApi;
import com.github.martvey.cli.service.JobService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {
    private final JobApi jobApi;
    private final EasyGraphOperator easyGraphOperator;
    private static final String GRAPH_DESCRIPTION = "graph{label: %s;align: center; flow: %s;}";
    private static final String NODE_DESCRIPTION = "[%s]{label: %s;align: center;}";
    private static final String NODE_RELATION = "[%s] --%s--> [%s]";

    @Override
    public List<JobTable> listJobTable() {
        return jobApi.listJob();
    }

    @Override
    public void createJob(String versionId, String jobName, String clusterId, String target) {
        jobApi.createJob(new PJobRequest(versionId, jobName, clusterId, target));
    }

    @Override
    public void dropJob(String jobId) {
        jobApi.dropJob(jobId);
    }

    @Override
    public void runJob(String jobId) {
        jobApi.runJob(new USqlJobRequest(jobId));
    }

    @Override
    public void stopJob(String jobId) {
        jobApi.stopJob(new USqlJobRequest(jobId));
    }

    @Override
    public void reRunJob(String jobId) {
        jobApi.reRunJob(new USqlJobRequest(jobId));
    }

    @Override
    public void showPlan(String jobId, GraphFlowEnum flow) {
        Plan jobPlan = jobApi.getJobPlan(jobId);
        StringBuilder easyGraphPlan = new StringBuilder();

        String graphFlow = flow == null ? GraphFlowEnum.EAST.name().toLowerCase():flow.name().toLowerCase();
        String graphLabel = jobPlan.getName() + "\\n" + "jobId:" + jobPlan.getJid();
        easyGraphPlan.append(buildGraphDescription(graphLabel, graphFlow)).append("\n");

        if (!CollectionUtils.isEmpty(jobPlan.getNodes())) {
            for (Node node : jobPlan.getNodes()) {
                easyGraphPlan.append(buildNodeDescription(node.getId(), node.getDescription())).append("\n");
            }

            for (Node node : jobPlan.getNodes()) {
                if (CollectionUtils.isEmpty(node.getInputs())) {
                    continue;
                }
                for (Input input : node.getInputs()) {
                    easyGraphPlan.append(buildNodeRelation(input.getId(), node.getId(), input.getShipStrategy())).append("\n");
                }
            }
        }

        easyGraphOperator.printGraph(easyGraphPlan.toString());
    }

    private String buildNodeRelation(String from, String to, String ship) {
        return String.format(NODE_RELATION, from, ObjectUtils.isEmpty(ship) ? "-" : " " + ship + " ", to);
    }

    private String buildNodeDescription(String nodeId, String label) {
        return String.format(NODE_DESCRIPTION, nodeId, textWrap(label, 20) + "\\n" + " nodeId: " + nodeId.substring(0, 7));
    }

    private String buildGraphDescription(String label, String flow) {
        return String.format(GRAPH_DESCRIPTION, label, flow);
    }

    /**
     *分割字符串，但不截断单词
     * @param text 字符串
     * @param length 每行最大长度
     * @return 带换行符的字符串
     */
    private String textWrap(String text, Integer length) {
        char[] charArray = text.toCharArray();
        StringBuilder txt = new StringBuilder();

        int i=0, subMark = -1;
        for (int j = i + 1; j < charArray.length; j++) {
            if (charArray[j] == ' '){
                subMark = j;
            }

            if (j - i >= length && subMark > 0){
                int strLength = subMark - i;
                txt.append(new String(charArray, i, strLength).trim()).append("\\n");
                i = subMark + 1;
                subMark = -1;
            }
        }

        if (i < charArray.length){
            txt.append(new String(charArray, i, charArray.length - i).trim());
        }

        return txt.toString();
    }
}
