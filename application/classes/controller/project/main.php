<?php defined('SYSPATH') OR die('No direct access allowed.');

/**
 * Project Controller - Handles Individual Projects
 *
 * PHP version 5
 * LICENSE: This source file is subject to GPLv3 license 
 * that is available through the world-wide-web at the following URI:
 * http://www.gnu.org/copyleft/gpl.html
 * @author	   Ushahidi Team <team@ushahidi.com> 
 * @package	   Ushahidi - http://source.swiftly.org
 * @subpackage Controllers
 * @copyright  Ushahidi - http://www.ushahidi.com
 * @license	   http://www.gnu.org/copyleft/gpl.html GNU General Public License v3 (GPLv3) 
 */
class Controller_Project_Main extends Controller_Sweeper {
	
	/**
	 * This Project
	 */
	protected $project;
	
	/**
	 * @return	void
	 */
	public function before()
	{
		// Execute parent::before first
		parent::before();
		
		// First we need to make sure this project
		// actually exists
		$id = $this->request->param('id');
		
		if (is_numeric($id))
		{
			$this->project = ORM::factory('project', $id);
			if ( ! $this->project->loaded())
			{
				// It doesn't -- redirect back to all projects
				$this->request->redirect('projects');
			}
		}
		else
		{
			// Non-Numeric ID -- redirect back to all projects
			$this->request->redirect('projects');
		}
		
		$this->template->header->active_project = $this->project->project_title;
		$this->template->header->menu->active_project_id = $this->project->id;
		$this->template->header->page_title = $this->project->project_title;
		$this->template->header->tab_menu = View::factory('pages/project/menu');
		$this->template->header->tab_menu->project_id = $this->project->id;
		$this->template->header->tab_menu->active = '';
	}
	
	/**
	 * List all the Projects
	 *
	 * @return	void
	 */
	public function action_index()
	{
		$this->template->content = View::factory('pages/project/overview')
			->bind('project', $this->project)
			->bind('feeds', $feeds)
			->bind('stories', $stories)
			->bind('items', $items);

		$feeds = ORM::factory('feed')
			->where('project_id', '=', $this->project->id)
			->count_all();
		$stories = ORM::factory('story')
			->where('project_id', '=', $this->project->id)
			->count_all();
		$items = ORM::factory('item')
			->where('project_id', '=', $this->project->id)
			->count_all();
	}
}