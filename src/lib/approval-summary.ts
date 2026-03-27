import type { Project, Deliverable, Comment } from './mock-data';

export function generateApprovalSummary(
  project: Project,
  deliverables: Deliverable[],
  allComments: Comment[]
) {
  const lines: string[] = [];
  const hr = '─'.repeat(60);

  lines.push(`APPROVAL SUMMARY`);
  lines.push(hr);
  lines.push(`Project: ${project.name}`);
  lines.push(`Client: ${project.clientName} (${project.clientEmail})`);
  lines.push(`Status: ${project.status.replace(/_/g, ' ').toUpperCase()}`);
  lines.push(`Deadline: ${new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
  lines.push(`Created: ${new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);
  lines.push(`Progress: ${project.approvedCount}/${project.deliverableCount} approved`);
  lines.push('');
  lines.push(hr);
  lines.push('DELIVERABLES');
  lines.push(hr);

  deliverables.forEach((d, i) => {
    lines.push('');
    lines.push(`${i + 1}. ${d.title}`);
    lines.push(`   File: ${d.fileName}`);
    lines.push(`   Status: ${d.status.replace(/_/g, ' ').toUpperCase()}`);
    lines.push(`   Version: ${d.version}`);
    lines.push(`   Submitted: ${new Date(d.submittedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`);

    if (d.versions && d.versions.length > 1) {
      lines.push(`   Version History:`);
      d.versions.forEach(v => {
        lines.push(`     v${v.version} — ${new Date(v.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}${v.note ? ` — "${v.note}"` : ''}`);
      });
    }

    const delComments = allComments.filter(c => c.deliverableId === d.id);
    if (delComments.length > 0) {
      lines.push(`   Comments:`);
      delComments.forEach(c => {
        const date = new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const resolvedTag = c.resolved ? ' [RESOLVED]' : '';
        lines.push(`     [${date}] ${c.authorName} (${c.authorType}): ${c.body}${resolvedTag}`);
      });
    }
  });

  lines.push('');
  lines.push(hr);
  lines.push(`Generated: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}`);
  lines.push(`Powered by Approvr`);

  const content = lines.join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}-approval-summary.txt`;
  a.click();
  URL.revokeObjectURL(url);
}
