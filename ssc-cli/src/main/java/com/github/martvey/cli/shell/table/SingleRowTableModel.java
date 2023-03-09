package com.github.martvey.cli.shell.table;

import org.springframework.shell.table.TableModel;

public class SingleRowTableModel extends TableModel {
    private final String[] title;
    private final String[] content;

    private SingleRowTableModel(String[] title, String[] content) {
        this.title = title;
        this.content = content;
    }

    @Override
    public int getRowCount() {
        return 2;
    }

    @Override
    public int getColumnCount() {
        return title.length;
    }

    @Override
    public Object getValue(int row, int column) {
        if (row == 0){
            return title[column];
        }
        if (content == null || column > content.length){
            return "";
        }
        return content[column];
    }

    public static SingleRowTableModelBuilder builder(){
        return new SingleRowTableModelBuilder();
    }

    public static class SingleRowTableModelBuilder{
        private String[] titles = new String[0];
        private String[] contents = new String[0];

        public SingleRowTableModelBuilder title(String ... title){
            this.titles = title;
            return this;
        }

        public SingleRowTableModelBuilder addTitle(String title){
            int titleLength = this.titles.length;
            String[] newTitles = new String[titleLength + 1];
            newTitles[titleLength] = title;
            System.arraycopy(this.titles, 0, newTitles, 0, titleLength);
            this.titles = newTitles;
            return this;
        }

        public SingleRowTableModelBuilder content(String ... content){
            this.contents = content;
            return this;
        }

        public SingleRowTableModelBuilder addContent(String content){
            int contentLength = this.contents.length;
            String[] newContents = new String[contentLength + 1];
            newContents[contentLength] = content;
            System.arraycopy(this.contents, 0, newContents, 0, contentLength);
            this.contents = newContents;
            return this;
        }

        public SingleRowTableModel build(){
            return new SingleRowTableModel(titles, contents);
        }
    }
}
