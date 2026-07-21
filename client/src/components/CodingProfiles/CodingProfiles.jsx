import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import { GitHubCalendar } from 'react-github-calendar';

export default function CodingProfiles() {
  const [selectedPlatform, setSelectedPlatform] = useState('GitHub');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const profiles = [
    {
      platform: 'LeetCode',
      username: '@tanishaali',
      href: 'https://leetcode.com/u/tanisha751/',
      stats: '200+ Problems Solved',
      description: 'Consistent problem-solving practice focusing on DSA and algorithms',
      icon: CodeIcon,
      color: 'from-orange-500/20 to-orange-600/20',
    },
    {
      platform: 'GitHub',
      username: '@tanishaali',
      href: 'https://github.com/tanisha971',
      stats: '25+ Repositories',
      description: 'Open source contributions and personal projects',
      icon: GitHubIcon,
      color: 'from-purple-500/20 to-purple-600/20',
    },
    {
      platform: 'Take U Forward',
      username: 'Profile',
      href: 'https://takeuforward.org/profile/tanishaali89',
      stats: 'DSA Learning',
      description: 'Problem-solving practice and learning resources',
      icon: CodeIcon,
      color: 'from-blue-500/20 to-blue-600/20',
    },
  ];

  const activityViews = {
    GitHub: {
      label: 'GitHub contribution activity',
      link: 'https://github.com/tanisha971',
      ariaLabel: 'GitHub contribution chart for Tanisha Ali',
      type: 'heatmap',
      theme: {
        empty: 'bg-[#161b22]',
        low: 'bg-[#0e4429]',
        medium: 'bg-[#006d32]',
        high: 'bg-[#26a641]',
        peak: 'bg-[#39d353]',
      },
      seed: 11,
    },
    LeetCode: {
      label: 'LeetCode practice activity',
      link: 'https://leetcode.com/u/tanisha751/',
      ariaLabel: 'LeetCode activity chart for Tanisha Ali',
      type: 'leetcodeHeatmap',
      username: 'tanisha751',
    },
  };

  const selectedActivity = activityViews[selectedPlatform];
  const [leetCodeHeatmap, setLeetCodeHeatmap] = useState({ cells: [], monthMarkers: [], loaded: false });

  const leetCodeTheme = {
    empty: 'bg-[#161b22]',
    low: 'bg-[#0e4429]',
    medium: 'bg-[#006d32]',
    high: 'bg-[#26a641]',
    peak: 'bg-[#39d353]',
  };

  const renderCustomHeatmap = (heatmapData, theme) => (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="min-w-[920px]">
        <div className="mb-2 grid" style={{ gridTemplateColumns: 'repeat(53, 14px)' }}>
          {heatmapData.monthMarkers.map((marker) => (
            <span
              key={`${marker.label}-${marker.week}`}
              className="text-xs font-medium text-gray-400"
              style={{ gridColumnStart: marker.week + 1 }}
            >
              {marker.label}
            </span>
          ))}
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: 'repeat(53, 14px)',
            gridTemplateRows: 'repeat(7, 14px)',
            gridAutoFlow: 'column',
            gap: '3px',
          }}
        >
          {heatmapData.cells.map((cellClass, index) => (
            <div
              key={index}
              className={`h-[14px] w-[14px] rounded-sm ${theme[cellClass]}`}
              title={selectedActivity.label}
            />
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
          <span>Less</span>
          <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ${theme.empty}`} />
            <span className={`h-3 w-3 rounded-sm ${theme.low}`} />
            <span className={`h-3 w-3 rounded-sm ${theme.medium}`} />
            <span className={`h-3 w-3 rounded-sm ${theme.high}`} />
            <span className={`h-3 w-3 rounded-sm ${theme.peak}`} />
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    if (selectedPlatform !== 'LeetCode') {
      return;
    }

    const controller = new AbortController();

    const loadLeetCodeHeatmap = async () => {
      try {
        const response = await fetch('https://leetcode.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            operationName: 'userProfileCalendar',
            query: `
              query userProfileCalendar($username: String!) {
                matchedUser(username: $username) {
                  submissionCalendar
                }
              }
            `,
            variables: { username: activityViews.LeetCode.username },
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to load LeetCode activity');
        }

        const payload = await response.json();
        const calendarString = payload?.data?.matchedUser?.submissionCalendar ?? '{}';
        const submissionCalendar = typeof calendarString === 'string' ? JSON.parse(calendarString) : calendarString;

        const endDate = new Date();
        endDate.setHours(0, 0, 0, 0);

        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 364);
        const startDay = startDate.getDay();
        startDate.setDate(startDate.getDate() - startDay);

        const cells = [];
        const monthMarkers = [];
        let lastMonth = -1;

        for (let week = 0; week < 53; week += 1) {
          for (let day = 0; day < 7; day += 1) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + week * 7 + day);

            if (date > endDate) {
              cells.push('empty');
              continue;
            }

            if (date.getMonth() !== lastMonth) {
              monthMarkers.push({ label: monthNames[date.getMonth()], week });
              lastMonth = date.getMonth();
            }

            const timestamp = Math.floor(date.getTime() / 1000);
            const contributionCount = Number(submissionCalendar?.[timestamp] ?? 0);

            if (contributionCount >= 8) cells.push('peak');
            else if (contributionCount >= 4) cells.push('high');
            else if (contributionCount >= 2) cells.push('medium');
            else if (contributionCount >= 1) cells.push('low');
            else cells.push('empty');
          }
        }

        setLeetCodeHeatmap({ cells, monthMarkers, loaded: true });
      } catch (error) {
        if (error.name !== 'AbortError') {
          setLeetCodeHeatmap({ cells: [], monthMarkers: [], loaded: true });
        }
      }
    };

    loadLeetCodeHeatmap();

    return () => controller.abort();
  }, [selectedPlatform, monthNames, activityViews.LeetCode.username]);

  return (
    <section id="coding-profiles" className="py-24 px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Coding Profiles</h2>
          <div className="w-24 h-1 bg-white mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Connect with me across various platforms and explore my coding journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.platform}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-300"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${profile.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              <div className="relative z-10 space-y-6">
                {/* Icon */}
                <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-all">
                  <profile.icon size={32} className="text-white" />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white">{profile.platform}</h3>
                  <p className="text-gray-400 text-sm">{profile.username}</p>
                  <div className="pt-2 pb-2">
                    <div className="text-xl font-bold text-white mb-1">{profile.stats}</div>
                    <p className="text-gray-300 text-sm">{profile.description}</p>
                  </div>
                </div>

                {/* Visit Button */}
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 font-medium"
                >
                  <span>Visit Profile</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">Coding Activity</h3>
              <p className="text-gray-400 text-sm mt-2">
                Select a platform to preview the recent activity boxes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {Object.keys(activityViews).map((platform) => {
                const isActive = selectedPlatform === platform;

                return (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => setSelectedPlatform(platform)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'border-emerald-400 bg-emerald-400/15 text-white'
                        : 'border-white/10 bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {platform === 'GitHub' ? <GitHubIcon fontSize="small" /> : <CodeIcon fontSize="small" />}
                    {platform}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedPlatform === 'GitHub' ? (
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="min-w-[920px]">
                <GitHubCalendar
                  username="tanisha971"
                  blockSize={14}
                  blockMargin={3}
                  fontSize={12}
                  hideColorLegend={false}
                  hideMonthLabels={false}
                  hideTotalCount={true}
                  style={{ color: '#d1d5db' }}
                />
              </div>
            </div>
          ) : selectedPlatform === 'LeetCode' ? (
            leetCodeHeatmap.loaded ? (
              leetCodeHeatmap.cells.length > 0 ? (
                renderCustomHeatmap(leetCodeHeatmap, leetCodeTheme)
              ) : (
                <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-gray-400">
                  Unable to load LeetCode activity right now.
                </div>
              )
            ) : (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-gray-400">
                Loading LeetCode activity...
              </div>
            )
          ) : null}

          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <p className="text-gray-400 text-sm">{selectedActivity.label}</p>
            <a
              href={selectedActivity.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-white"
            >
              Open selected profile
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
